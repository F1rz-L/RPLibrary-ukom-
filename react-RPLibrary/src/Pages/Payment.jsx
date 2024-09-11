import React, { useEffect, useState, useRef } from 'react';
import UseGet from '../Axios/UseGet';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { link } from '../Axios/link';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [idUser, setIdUser] = useState(sessionStorage.getItem('iduser') || null);
    const [user] = UseGet(`/user/${idUser}`);
    const [snapToken, setSnapToken] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const confirmedRef = useRef(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Handle payment status from query parameters
    useEffect(() => {
        if (confirmedRef.current) return; // Skip if already confirmed

        const params = new URLSearchParams(location.search);
        const orderId = params.get('order_id');
        const statusCode = params.get('status_code');
        const transactionStatus = params.get('transaction_status');

        if (transactionStatus) {
            // Set payment status
            setPaymentStatus(transactionStatus);
            if (transactionStatus === 'settlement') {
                const topupfix = sessionStorage.getItem('topupamount') / 2 // karena useeffect nya ke run 2x hehe

                const formData = new FormData();
                formData.append('topupamount', topupfix);

                link.post(`/confirmTopup/${sessionStorage.getItem('iduser')}`, formData)
                    .then(res => {
                        console.log('Top-up confirmed:', res.data);
                        confirmedRef.current = true; // Mark as confirmed
                        navigate('/payment');
                    })
                    .catch(error => {
                        console.error('Error confirming top-up:', error.response.data);
                    });
            }
        }
    }, [location.search, navigate]);

    // Dynamically load Snap.js script
    useEffect(() => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const myMidtransClientKey = 'SB-Mid-client-GWcpAF3I4bKLr5aE';

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    // Submit form and get Snap token
    const submitForm = async (data) => {
        const formData = new FormData();
        formData.append('topupamount', data.topup);

        await link.post(`/topup/${idUser}`, formData)
            .then(res => {
                sessionStorage.setItem('topupamount', data.topup);
                setSnapToken(res.data.snapToken); // Set Snap token
            })
            .catch(error => {
                console.error(error.response.data);
            });
    };

    // Trigger Midtrans payment interface
    const triggerPayment = () => {
        if (window.snap && snapToken) {
            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    console.log(result);    
                    // Handle success on client side if necessary
                },
                onPending: function (result) {
                    console.log(result);
                },
                onError: function (result) {
                    console.error(result);
                },
                onClose: function () {
                    console.log('Customer closed the popup without finishing the payment');
                },
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
            <div>
                <div className="flex justify-center">
                    <div className="bg-base-200 p-4 rounded-box">
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-bold">Your Balance</h1>
                        </div>
                        <h1 className="text-3xl mx-2 my-4">
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
