import React, { useEffect, useState } from 'react';
import UseGet from '../Axios/UseGet';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { link } from '../Axios/link';

function Payment() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [idUser, setIdUser] = useState(sessionStorage.getItem('iduser') || null);
    const [user] = UseGet(`/user/${idUser}`);
    const [snapToken, setSnapToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const myMidtransClientKey = 'SB-Mid-client-GWcpAF3I4bKLr5aE';

        // Dynamically load Snap.js script
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    // Function to handle form submission
    function submitForm(data) {
        setErrorMessage('');
        if (data.topup < 0) {
            setErrorMessage('Top up amount cannot be negative');
        } else {
            const formData = new FormData();
            formData.append('topupamount', data.topup);

            link.post(`/topup/${idUser}`, formData).then(res => {
                setSnapToken(res.data.snapToken); // Set the Snap token for triggering payment
                sessionStorage.setItem('topupamount', data.topup);
            }).catch(error => {
                console.error(error.response.data);
            });
        }
    };

    // Trigger the Midtrans payment interface
    const triggerPayment = () => {
        if (window.snap && snapToken) {
            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    console.log(result);

                    const formData = new FormData();

                    formData.append('topupamount', sessionStorage.getItem('topupamount'));
                    link.post(`/confirmTopup/${idUser}`, formData).then(res => {
                        sessionStorage.removeItem('topupamount');
                        // window.location.reload();
                    }).catch(error => {
                        console.error(error.response.data);
                    });
                    // Handle successful payment, e.g., update balance or redirect
                },
                onPending: function (result) {
                    console.log(result);
                    window.location.reload();
                },
                onError: function (result) {
                    console.error(result);
                    window.location.reload();
                },
                onClose: function () {
                    console.log('Customer closed the popup without finishing the payment');
                    window.location.reload();
                }
            });
        }
    };

    useEffect(() => {
        if (snapToken) {
            triggerPayment(); // Trigger payment when Snap token is set
        }
    }, [snapToken]);

    return (
        <>
            <div className=''>
                <div className="flex justify-center">
                <div className='absolute z-[3]'>
                    {errorMessage && (
                        <div role="alert" className="alert alert-error">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span className="ml-2">
                                {errorMessage}
                            </span>
                        </div>
                    )}
                </div>
                    <div className='bg-base-200 p-4 rounded-box'>
                        <div className="flex justify-center">
                            <h1 className='text-3xl font-bold'>Your Balance</h1>
                        </div>
                        <h1 className='text-3xl mx-2 my-4'>
                            {Number(user.data?.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <form onSubmit={handleSubmit(submitForm)} className="col-6 gap-2 my-10 flex justify-center">
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faMoneyBillTransfer} />
                            <input type="text" {...register("topup", { required: true })} className="grow" placeholder="Topup amount..." />
                        </label>
                        <span className="label-text text-red-700">{errors.topup && "Kolom harus diisi"}</span>
                        <button type="submit" className="btn btn-primary">Topup</button>
                    </form>

                    {/* Embed Midtrans Payment in this col-6 */}
                    <div className="col-6">
                        {/* Optionally, you can display a message or placeholder */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;
