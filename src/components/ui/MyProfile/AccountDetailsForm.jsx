import Recat from 'react';


const FormGroup = ({ label, required, defaultValue, sub }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      defaultValue={defaultValue}
      className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:outline-none"
    />
    {sub && <p className="text-xs text-slate-400">{sub}</p>}
  </div>
);

const FormInput = ({ placeholder, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full mt-3 bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:outline-none"
  />
);

export function AccountDetailsForm (){
    return(
        <>
        <div className=" w-full min-h-screen text-white ">
              {/* PAGE TITLE */}
              {/* <h1 className="text-3xl font-semibold mb-2">Account Details</h1>
              <p className="text-slate-400 mb-8">My Account &gt; Account details</p> */}
        
              <div className="grid grid-cols-7 gap-2">
                {/* LEFT SIDEBAR */}
               
        
                {/* RIGHT FORM */}
                <div className="col-span-9 bg-slate-800 border border-slate-700 rounded-xl p-8">
                  <form className="space-y-8">
                    {/* FIRST + LAST NAME */}
                    <div className="grid grid-cols-2 gap-6">
                      <FormGroup label="First name" required defaultValue="Abhishek" />
                      <FormGroup label="Last name" required defaultValue="Jha" />
                    </div>
        
                    {/* DISPLAY NAME */}
                    <FormGroup
                      label="Display name"
                      required
                      defaultValue="ABHISHEK"
                      sub="This will be shown on Dashboard & Reviews"
                    />
        
                    {/* EMAIL */}
                    <FormGroup
                      label="Email address"
                      required
                      defaultValue="ajha838301@gmail.com"
                    />
        
                    {/* PASSWORD CHANGE */}
                    <div>
                      <label className="block font-medium mb-2">Password change</label>
        
                      <FormInput
                        placeholder="Current password (leave blank to keep)"
                        type="password"
                      />
                      <FormInput
                        placeholder="New password (leave blank to keep)"
                        type="password"
                      />
                      <FormInput placeholder="Confirm new password" type="password" />
                    </div>
        
                    {/* SAVE */}
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-md font-semibold"
                    >
                      SAVE CHANGES
                    </button>
                  </form>
                </div>
              </div>
            </div>
        </>
    )
}