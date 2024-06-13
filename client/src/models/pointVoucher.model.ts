export default interface PointVoucher {
  point: {
    id: string;
    point: number;
    pointExpiredDate: string;
  };
  voucher: {
    id: string;
    userId: string;
    ammount: number;
    isUsed: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
