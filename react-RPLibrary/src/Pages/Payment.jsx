import React from 'react'
import UseGet from '../Axios/UseGet'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { link } from '../Axios/link';

function Payment() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [user] = UseGet(`/user/${sessionStorage.getItem('iduser')}`)
    console.log(user);

    function submitForm(data) {
        const formData = new FormData();
        formData.append('topupamount', data.topup);

        link.post(`/topup/${sessionStorage.getItem('iduser')}`, formData).then(res => {
            console.log(res.data)
            window.location.reload()
        }).catch(error => {
            console.error(error.response.data)
        })
    }

    return (
        <>
            <div className=''>
                <div className="flex justify-center">
                    <div className='bg-base-200 p-4 rounded-box'>
                        <div className="flex justify-center">
                            <h1 className='text-3xl font-bold'>Your Balance</h1>
                        </div>
                        <h1 className='text-3xl mx-2 my-4'>{Number(user.data?.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h1>
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
                    <div className="col-6">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment