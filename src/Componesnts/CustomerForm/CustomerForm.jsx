import "./CustomerForm.css";

const CustomerForm = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  return (
    <div className="">
      <div className="mb-2">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-5 text-white">
            Customer Name :
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="customerName"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
            required
          />
        </div>
      </div>
      <div className="mb-2">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="MobileNumber" className="col-5 text-white">
            Mobile Number :
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="MobileNumber"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
            required
          />
        </div>
      </div>
    </div>
  );
};
export default CustomerForm;
