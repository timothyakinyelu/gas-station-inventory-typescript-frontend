/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { AppState } from '../../redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import { MetricState, Metric } from '../../redux/dashboard/types';

interface GraphProps {
    chartInfo?: Metric[];
}

const Graph: React.FC<GraphProps> = ({ chartInfo }): JSX.Element => {
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [dataSet, setDataSet] = useState<Metric[]>([]);

    useEffect(() => {
        const ac = new AbortController();

        if (!chartInfo) {
            return;
        }

        setDataSet(chartInfo?.map((charts: Metric) => charts));
        setIsloading(false);

        return function cleanup(): void {
            ac.abort();
        };
    }, [chartInfo]);

    return (
        <>
            <div className="row justify-content-center card-body">
                {!isLoading &&
                    dataSet.map((d: Metric) => (
                        <Chart
                            key={d.id}
                            width={'400px'}
                            height={'80%'}
                            chartType="AreaChart"
                            data={[
                                ['Month', 'Sales', 'Expenses'],
                                ...d.data.map((s: any) => [s.month, parseInt(s.totalSale), parseInt(s.totalExpense)]),
                            ]}
                            options={{
                                title: d.name,
                                hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                                // For the legend to fit, we make the chart area smaller
                                chartArea: { width: '50%', height: '60%' },
                                backgroundColor: 'transparent',
                                overflowX: 'scroll',
                                // lineWidth: 25
                            }}
                        />
                    ))}
            </div>
        </>
    );
};

Graph.propTypes = {
    chartInfo: PropTypes.any,
};

const mapStateToProps = (state: AppState): MetricState => ({
    chartInfo: state.metric.chartInfo,
});

export default connect(mapStateToProps)(Graph);
