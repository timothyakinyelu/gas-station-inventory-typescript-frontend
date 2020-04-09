/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { addToast } from '../../redux/toast/actions';
import { Users, FETCH_USERS, UsersState } from '../../redux/users/types';
import { connect, useDispatch } from 'react-redux';
import user from '../../api/user';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import DataTable from '../../reusables/partials/DataTable';
import { AppState } from '../../redux';

interface UsersListProp {
    users?: Users;
    addToast?: typeof addToast;
    getUsers: () => void;
    handleEdit: (value?: number) => void;
}

const UsersList: React.FC<UsersListProp> = (props): JSX.Element => {
    const { users } = props;

    const items = users;
    const count = Math.random() * 100 + 1;

    const history = useHistory();
    const dispatch = useDispatch();
    const { companyID, company } = useParams();

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            user.getUsers(companyID, pageNumber).then((res) => {
                dispatch({
                    type: FETCH_USERS,
                    payload: {
                        users: res.data,
                    },
                });
            });

            history.push('/' + companyID + '/' + company + '/users?page=' + pageNumber);
        },
        [dispatch, history, companyID, company],
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

    const deleteSelected = (data?: any[]): void => {
        user.deleteUser(data).then((res) => {
            addToast({
                id: count,
                message: res.data.status,
            });
            props.getUsers();
        });
    };

    return (
        <div className="list-table">
            <div className="list-table-inner">
                {items?.data === undefined || items?.data.length < 0 ? (
                    <h5>No Records Available!</h5>
                ) : (
                    <DataTable
                        items={items}
                        deleteSelected={deleteSelected}
                        changePage={changePage}
                        handleEdit={props.handleEdit}
                    />
                )}
            </div>
        </div>
    );
};

UsersList.propTypes = {
    users: PropTypes.object,
    addToast: PropTypes.any,
    getUsers: PropTypes.any,
    handleEdit: PropTypes.any,
};

const mapStateToProps = (state: AppState): UsersState => ({
    users: state.usersRoot.users,
});

export default connect(mapStateToProps, { addToast })(UsersList);
