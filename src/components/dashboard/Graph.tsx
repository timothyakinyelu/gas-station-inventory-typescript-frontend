import React, { useEffect, useState } from 'react';
import { AppState } from '../../redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import { MetricState, Metric } from '../../redux/dashboard/types';

interface GraphProps {
    chartInfo: Metric[];
}

const Graph: React.FC<GraphProps> = ({ chartInfo }): JSX.Element => {
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [dataSet, setDataSet] = useState<Metric[]>([]);
    const charts = (): Metric[] => {
        return chartInfo.map((charts: Metric) => charts);
    };

    useEffect(() => {
        if (chartInfo === []) {
            return;
        }

        setDataSet(charts());
        setIsloading(false);
    }, [chartInfo]);
    return (
        <>
            <h3>Graph</h3>
            {!isLoading &&
                dataSet.map((d: Metric) => (
                    <Chart
                        key={d.id}
                        width={400}
                        height={'300px'}
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
                            chartArea: { width: '50%', height: '70%' },
                            // lineWidth: 25
                        }}
                    />
                ))}
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
