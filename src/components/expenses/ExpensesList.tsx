/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { ExpensesState, Expenses, FETCH_STATION_EXPENSES } from '../../redux/expenses/types';
import { connect, useDispatch } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';
import expense from '../../api/expense';
import { useHistory, useLocation, useParams } from 'react-router-dom';

interface ExpensesListProps {
    station?: Station;
    expenses?: Expenses;
}
const ExpensesList: React.FC<ExpensesListProps> = ({ station, expenses }): JSX.Element => {
    const str = station?.slug;

    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const items = expenses;

    const history = useHistory();
    const dispatch = useDispatch();
    const { companyID, company, stationID, stationName } = useParams();

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            expense.getExpensesByStation(Number(stationID), pageNumber).then((res) => {
                dispatch({
                    type: FETCH_STATION_EXPENSES,
                    payload: {
                        expenses: res.data,
                    },
                });
            });

            history.push(
                '/' + companyID + '/' + company + '/expenses/' + stationID + '/' + stationName + '?page=' + pageNumber,
            );
        },
        [dispatch, history, companyID, company, stationID, stationName],
    );

    const changePage = useCallback(
        (pageNumber: number): void => {
            if (pageNumber) {
                fetchData(pageNumber);
            }
        },
        [fetchData],
    );

    useEffect(() => {
        const ac = new AbortController();
        if (!page) {
            return;
        }

        fetchData(page);
        changePage(page);
        return function cleanup(): void {
            ac.abort();
        };
    }, [page, changePage, fetchData]);

    const showDayExpenses = (date: any): void => {
        history.push('/' + companyID + '/' + company + '/expenses/' + stationID + '/' + stationName + '/' + date);
    };

    return (
        <div className="list-table">
            {name && (
                <>
                    <h5 title={name} className="sales-table-header">
                        {name} Expenses Table
                    </h5>
                    <div className="list-table-inner">
                        {items?.data === undefined || items?.data.length < 0 ? (
                            <h5>No Records Available!</h5>
                        ) : (
                            <DataTable items={items} name={name} changePage={changePage} getDetails={showDayExpenses} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

ExpensesList.propTypes = {
    station: PropTypes.any,
    expenses: PropTypes.any,
};

const mapStateToProps = (state: AppState): ExpensesState => ({
    expenses: state.expensesRoot.expenses,
});

export default connect(mapStateToProps)(ExpensesList);
