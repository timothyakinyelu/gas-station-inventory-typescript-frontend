/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { fetchExpensesDetails, fetchExpenseToEdit } from '../../redux/expenses/actions';
import { useParams } from 'react-router-dom';
import expense from '../../api/expense';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { Expenses, ExpensesState, Expense } from '../../redux/expenses/types';
import DataTable from '../../reusables/partials/DataTable';
import Loader from '../../reusables/Loader';
import { addToast } from '../../redux/toast/actions';
import EditExpenseModal from '../../components/expenses/EditExpenseModal';

interface ExpensesDetailProps {
    fetchExpensesDetails: typeof fetchExpensesDetails;
    addToast: typeof addToast;
    fetchExpenseToEdit: typeof fetchExpenseToEdit;
    expensesDetail?: Expenses;
    editExpense?: Expense;
}

const ExpensesDetail: React.FC<ExpensesDetailProps> = (props): JSX.Element => {
    const { fetchExpensesDetails, expensesDetail, fetchExpenseToEdit, editExpense } = props;

    const { stationID, date } = useParams();

    const [isFetched, setIsFetched] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const count = Math.random() * 100 + 1;

    const items = expensesDetail;

    const getExpensesDetail = useCallback((): any => {
        expense
            .getStationDayExpense(Number(stationID), date)
            .then((res) => {
                fetchExpensesDetails({
                    expensesDetail: res.data,
                });
                setIsFetched(true);
            })
            .catch((err) => {
                console.log(err.response.data);
                setIsFetched(false);
            });
    }, [fetchExpensesDetails, stationID, date]);

    useEffect(() => {
        const ac = new AbortController();

        if (date === undefined) {
            return;
        }

        getExpensesDetail();

        return function cleanup(): void {
            setIsFetched(false);
            ac.abort();
        };
    }, [date, getExpensesDetail]);

    const handleEdit = (id?: number): void => {
        setEditModalShow(true);
        setLoading(true);
        // try {
        expense
            .editDayExpense(id)
            .then((res) => {
                // console.log(res.data.user)
                fetchExpenseToEdit({
                    editExpense: res.data.sale,
                });
                setLoading(false);
            })
            .catch((err) => {
                props.addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
        // } catch (e) {
        //     console.log(e.response);
        // }
    };

    const handleHide = (): void => {
        setEditModalShow(false);
        setLoading(true);
    };

    const deleteSelected = (data?: any[]): void => {
        expense.deleteExpense(data).then((res) => {
            props.addToast({
                id: count,
                message: res.data.status,
            });
            getExpensesDetail();
        });
    };

    return (
        <>
            {!isFetched ? (
                <Loader />
            ) : (
                <>
                    <div className="list-table">
                        <h5 title="sales-detail" className="sales-table-header">
                            Expense Detail for {date}
                        </h5>
                        <div className="list-table-inner">
                            {items?.data === undefined || items?.data.length < 0 ? (
                                <h5>No Records Available!</h5>
                            ) : (
                                <DataTable items={items} deleteSelected={deleteSelected} handleEdit={handleEdit} />
                            )}
                        </div>
                        {!loading && (
                            <EditExpenseModal
                                show={editModalShow}
                                onHide={handleHide}
                                showEdit={editExpense}
                                handleLoad={getExpensesDetail}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

ExpensesDetail.propTypes = {
    fetchExpensesDetails: PropTypes.any,
    expensesDetail: PropTypes.any,
    fetchExpenseToEdit: PropTypes.any,
    addToast: PropTypes.any,
    editExpense: PropTypes.any,
};

const mapStateToProps = (state: AppState): ExpensesState => ({
    expensesDetail: state.expensesRoot.expensesDetail,
    editExpense: state.expensesRoot.editExpense,
});

export default connect(mapStateToProps, { fetchExpensesDetails, fetchExpenseToEdit, addToast })(ExpensesDetail);
