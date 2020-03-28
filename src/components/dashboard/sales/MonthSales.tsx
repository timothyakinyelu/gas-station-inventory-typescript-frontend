import React from 'react';
import { Metric, Data } from '../../../redux/dashboard/types';
import PropTypes from 'prop-types';

interface MonthSalesProps {
    sale: Metric;
}

const MonthSales: React.FC<MonthSalesProps> = ({ sale }): JSX.Element => {
    return (
        <div className="col-sm-6 col-md-4 col-xl-4">
            <h6 className="outlet-name">{sale.name}</h6>
            <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                <div className="icon-wrapper rounded-circle">
                    <div className="icon-wrapper-bg opacity-10 bg-warning"></div>
                    <i className=" fa fa-university text-white opacity-8" aria-hidden="true"></i>
                </div>
                <div className="widget-chart-content">
                    <div className="widget-subheading">Revenue</div>
                    {sale.data &&
                        sale.data.map((item: Data, index: number) => {
                            return (
                                <div key={index}>
                                    <div id={'perf' + index} className="widget-numbers">
                                        ₦{item.totalSale?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </div>
                                    <div className="widget-description opacity-8 text-focus">
                                        <div className="d-inline text-type pr-1">
                                            {/* <i aria-hidden="true" className="fa fa-angle-down"></i> */}
                                            <span className="pl-1">{item.productType}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="divider m-0 d-md-none d-sm-block"></div>
            </div>
        </div>
    );
};

MonthSales.propTypes = {
    sale: PropTypes.any,
};

export default MonthSales;
