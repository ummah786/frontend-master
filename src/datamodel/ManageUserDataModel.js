export const manageUserDataModel = {
    name: '',
    emailAddress: '',
    address: '',
    tempPassword: '',
    mobileNumber: '',
    role: '',
    accountBusinessName: '',
    secondary_user_id: '',
    primary_user_id: '',
    id: ''
}
export const businessAccountDataModel = {
    id: '',
    businessName: '',
    phoneNumber: '',
    email: '',
    billingAddress: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
    gstNumber: '',
    gstUser: '',
    panNumber: '',
    businessType: '',
    industryType: '',
    businessRegistrationType: '',
    logo: '',
    signature: '',
    primary_user_id: '',
    secondary_user_id: '',
}


export const partnerDataModel = {
    id: '',
    pname: '',//show
    mobileNumber: '',//show
    email: '',
    openingBalance: '',  //show
    openingBalanceType: '',
    partyType: '',  //customer ya Supllier  //show
    partyCategory: '',
    billingAddress: '',
    shippingAddress: '',
    gstNumber: '',
    creditPeriod: '',
    creditLimit: '',  //show
    creditPeriodType: '',
    loyality: '',
    company: '',
    primary_user_id: '',
    secondary_user_id: '',
    creationDateTime: '',
}
export const InventoryDataModel = {
    id: '',
    userName: '',
    item: '',
    category: '',//create a new
    companyName: '',//create a new
    itemCode: '',
    barCodeValue: '', //create a new
    itemDescription: '',
    totalStock: '',
    lowStock: '',
    lowStockCheckBox: false,
    rackNo: '',
    challanNo: '',
    unitNo: '',//dose,strip,injection,tables
    packageItems: '', // 5  * 10
    salePrice: '',
    salePriceTax: '',
    purchasePrice: '',
    purchasePriceTax: '',
    salt: '',
    batchNo: '',
    mfgDate: '',
    expireDate: '',
    mrp: '',
    gst: '',
    compensationCess: '',
    utgst: '',
    sgst: '',
    igst: '',
    cgst: '',
    supplier: '',
    warehouse: '',
    hsn: '',
    creationDateTime: '',
    primary_user_id: '',
    secondary_user_id: '',
}

export const userDetailModel = {
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    role: '',
    email: '',
    password: '',
    mobileNumber: '',
    tempPassword: '',
    primary_user_id: '',
    secondary_user_id: '',
    isLogin: '',
    lastLoginDate: '',
    token: '',

}


export const godownDataModel = {
    id: '',
    wareHouseName: '',
    address: '',
    state: '',
    zipCode: '',
    notes: '',
    date: '',
    city: '',
    primary_user_id: '',
    secondary_user_id: ''
}

export const productKeyValueModel = {
    id: '',
    kes: '',
    primary_user_id: '',
    secondary_user_id: '',
    value: ''
}


export const expenseDataModel = {
    id: '',
    expenseId: '',
    expenseDate: '',
    lastModifiedDate: '',
    paymentMode: '',
    expenseType: '',
    note: '',
    totalAmount: '',
    expenseItemsList: '',
    primary_user_id: '',
    secondary_user_id: ''
}