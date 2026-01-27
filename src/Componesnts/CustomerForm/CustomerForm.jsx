import './CustomerForm.css'

const CustomerForm=({custemerName, setCustomerName,mobileNumber, setMobileNumber})=>{
    return(
        <div className="p-3">
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="customerName"className="col-5 text-white" >Customer Name :</label>
                    <input type="text" className="form-control form-control-sm" id="customerName" 
                    onChange={(e)=>setCustomerName(e.target.value)} value={custemerName}/>
                </div>
            </div>
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="MobileNumber"className="col-5 text-white">Mobile Number :</label>
                    <input type="text" className="form-control form-control-sm" id="MobileNumber" 
                    onChange={(e)=>setMobileNumber(e.target.value)} value={mobileNumber}
                    />
                </div>
            </div>
        </div>
    )
}
export default CustomerForm;