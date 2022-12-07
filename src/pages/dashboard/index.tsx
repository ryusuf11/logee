import React, { ReactElement } from 'react';
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { getReport } from '@/modules/dashboard/dashboardService';
import { ReportData } from '@/modules/dashboard/dashboardEntity';
import dayjs from 'dayjs';

type DashboardProps = {
  report: ReportData | null;
  lastUpdate: string;
};
export default function Dashboard({ report, lastUpdate }: DashboardProps) {
  return (
    <div className="dashboard">
      <div className="dashboard__title">Laporan Performa Bisnis</div>
      <div className="dashboard__period">
        <div>Periode laporan : {new Date().getFullYear()}</div>
        <div>
          Pembaruan Terakhir : <span>{lastUpdate}</span>
        </div>
      </div>

      {report && (
        <div>
          <div className="report">
            <div className="report__title">GMV</div>
            <div className="report__subtitle">
              Akumulasi seluruh transaksi yang berhasil dilakukan dalam periode
              waktu yang dipilih
            </div>
            <div className="report__item">
              <span>Transaksi Kontainer</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.gmv.container)}
              </span>
            </div>
            <div className="report__item">
              <span>Transaksi Pesanan Truk</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.gmv.truckOrder)}
              </span>
            </div>
            <div className="report__item report__item--total">
              <span className="report__item--bold">Total</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.gmv.total)}
              </span>
            </div>
          </div>

          <div className="report">
            <div className="report__title">Transaksi</div>
            <div className="report__subtitle">
              Total transaksi dari semua metode pembayaran pada periode waktu
              yang dipilih
            </div>
            <div className="report__item">
              <span>Container Econ</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.containerCountEcon)}
              </span>
            </div>
            <div className="report__item">
              <span>Container Paylater</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.containerCountPayLater)}
              </span>
            </div>
            <div className="report__item">
              <span>Container VA</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.containerCountVA)}
              </span>
            </div>
            <div className="report__item">
              <span>Truk CC</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.orderTruckCountCC)}
              </span>
            </div>
            <div className="report__item">
              <span>Truk Internal B2B</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.orderTruckCountInternalB2B)}
              </span>
            </div>
            <div className="report__item">
              <span>Truk Invoice Acceptance</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.orderTruckCountInvoiceAcceptance)}
              </span>
            </div>
            <div className="report__item">
              <span>Truk Paylater</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.orderTruckCountPayLater)}
              </span>
            </div>
            <div className="report__item report__item--total">
              <span className="report__item--bold">Total</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.transaction.total)}
              </span>
            </div>
          </div>

          <div className="report">
            <div className="report__title">Revenue</div>
            <div className="report__subtitle">
              Total pendapatan dari seluruh transaksi pada periode waktu yang
              dipilih
            </div>
            <div className="report__item">
              <span>Kontainer Paylater</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.revenue.containerPayLater)}
              </span>
            </div>
            <div className="report__item">
              <span>Pesanan Truk Paylater</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.revenue.orderTruckPayLater)}
              </span>
            </div>
            <div className="report__item">
              <span>Invoice Acceptance</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.revenue.orderTruckInvoiceAcceptance)}
              </span>
            </div>
            <div className="report__item">
              <span>Charge Fee Kontainer</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.revenue.chargeFeeContainer)}
              </span>
            </div>
            <div className="report__item">
              <span>Charge Fee Pesanan Truk</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.revenue.chargeFeeOrderTruck)}
              </span>
            </div>
            <div className="report__item report__item--total">
              <span className="report__item--bold">Total</span>
              <span>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.revenue.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data: report } = await getReport(ctx, {
      period: 'yearly',
      year: `${new Date().getFullYear()}`,
    });

    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59',
    );
    return {
      props: {
        report,
        lastUpdate: dayjs().format('DD MMM YYYY - HH:mm WIB'),
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`[Dashboard]${JSON.stringify(error)}`);

    return {
      props: {
        report: null,
      },
    };
  }
};
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
