/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react';
import Stations from '../../reusables/partials/Stations';
import { setStation } from '../../redux/central/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { CentralState, Station } from '../../redux/central/types';
import { useParams } from 'react-router-dom';
import Loader from '../../reusables/Loader';
import ExpensesList from '../../components/expenses/ExpensesList';
import expense from '../../api/expense';
import { fetchStationExpenses } from '../../redux/expenses/actions';

interface ExpensesProps {
    setStation: typeof setStation;
    fetchStationExpenses: typeof fetchStationExpenses;
    station?: Station;
    history: any;
}

const Expenses: React.FC<ExpensesProps> = ({ setStation, station, history, fetchStationExpenses }): JSX.Element => {
    const { company, companyID, stationName, stationID } = useParams();
    const [isFetched, setIsFetched] = useState(true);

    const getExpensesByStation = useCallback(
        (id: number): void => {
            expense.getExpensesByStation(id).then((res) => {
                fetchStationExpenses({
                    expenses: res.data,
                });
                setIsFetched(true);
            });
        },
        [fetchStationExpenses],
    );

    useEffect(() => {
        const ac = new AbortController();

        if (stationID === undefined) {
            setStation({
                id: Number(),
                slug: '',
                isClicked: false,
            });
            return;
        }

        setStation({
            id: Number(stationID),
            slug: stationName,
            isClicked: true,
        });
        getExpensesByStation(Number(stationID));
        setIsFetched(false);

        return function cleanup(): void {
            setIsFetched(true);
            ac.abort();
        };
    }, [stationID, setStation, stationName, getExpensesByStation]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        e.preventDefault();

        const index = e.target.selectedIndex;
        const station = e.target[index].getAttribute('data-name') || undefined;
        const value = parseInt(e.target.value);

        setStation({
            id: value,
            slug: station,
            isClicked: true,
        });

        setIsFetched(false);
        if (!isFetched) {
            getExpensesByStation(value);
        }

        history.push('/' + companyID + '/' + company + '/expenses/' + value + '/' + station);
    };

    return (
        <div className="sales-header">
            <h3 className="signage">Service Station Expenses</h3>
            <Stations selectedStation={station} handleSelect={handleSelect} />

            {!isFetched ? (
                <div className="list-table">
                    <Loader />
                </div>
            ) : (
                station !== {} && <ExpensesList station={station} />
            )}
        </div>
    );
};

Expenses.propTypes = {
    setStation: PropTypes.any,
    fetchStationExpenses: PropTypes.any,
    station: PropTypes.any,
    history: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    station: state.center.station,
});

export default connect(mapStateToProps, { setStation, fetchStationExpenses })(Expenses);
