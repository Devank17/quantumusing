import React from 'react'

const Newsletter = () => {
    return (
    <>
    <section className='flex flex-row pt-5 bg-[#F3F0F0] w-[95%] text-black rounded-lg'>
                <div className='bg-transparent -1/2 pl-15 pt-5'>
                    <h1 className='text-7xl'>Connect to Quantum World</h1>
                    <p className='py-15 font-light text-xl'>Sign up for our newsletter and enjoy unmatched discounts, early access to sales, and insider tips!</p>
                </div>

                <form className='bg-transparent w-1/2 flex flex-col items-start gap-10 p-10'>
                    <div className='mb-0 border-b-2'>
                        <h2 className='text-3xl font-semibold text-justify'>Enter Your Email <span className='text-red-500'>*</span></h2>
                        <input type='email' className='border-none rounded-lg focus:outline-none' placeholder='Enter Your Email' />
                    </div>

                    <div className='flex flex-row gap-5 items-center'>
                        <input type="checkbox" className='bg-black transform scale-200' />
                        <h2 className='text-xl font-semibold'>Yes, Subscribe our Newsletter</h2>
                    </div>           

                    <button className='bg-black text-white px-15 py-2 rounded-lg font-light                text-2xl'>Submit</button>
                </form>
            </section>
    </>   
    );
};

export default Newsletter