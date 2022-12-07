export interface DashboardRequest {
  period: string;
  year: string;
  month?: string;
  week?: string;
  date?: string;
}

export interface DashboardResponse {
  success: boolean;
  data: ReportData;
  message: string;
  code: number;
  statusCode: string;
}

export interface ReportData {
  gmv: Gmv;
  transaction: Transaction;
  revenue: Revenue;
  vehicle: Vehicle;
}

export interface Gmv {
  container: number;
  truckOrder: number;
  total: number;
}

export interface Transaction {
  containerCountPayLater: number;
  containerCountEcon: number;
  containerCountVA: number;
  orderTruckCountInternalB2B: number;
  orderTruckCountPayLater: number;
  orderTruckCountCC: number;
  orderTruckCountInvoiceAcceptance: number;
  total: number;
}

export interface Revenue {
  containerPayLater: number;
  orderTruckPayLater: number;
  orderTruckInvoiceAcceptance: number;
  chargeFeeContainer: number;
  chargeFeeOrderTruck: number;
  total: number;
}

export interface Vehicle {
  dry20Ft: number;
  dry40Ft: number;
  dry45Ft: number;
  chiller20Ft: number;
  chiller40Ft: number;
  chiller45Ft: number;
  total: number;
}
