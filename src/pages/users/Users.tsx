import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../../reusables/Loader';
import { AddButton } from '../../reusables/partials/Buttons';
import UsersList from '../../components/users/UsersList';
import UserModal from '../../components/users/UserModal';
import user from '../../api/user';
import { fetchUsers, fetchUserToEdit } from '../../redux/users/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { User } from '../../redux/auth/types';
import { AppState } from '../../redux';
import { UsersState } from '../../redux/users/types';
import { addToast } from '../../redux/toast/actions';

interface UsersProp {
    fetchUsers: typeof fetchUsers;
    fetchUserToEdit: typeof fetchUserToEdit;
    editUser?: User;
    addToast: typeof addToast;
}

const Users: React.FC<UsersProp> = (props): JSX.Element => {
    const { fetchUsers, fetchUserToEdit, editUser } = props;

    const { companyID } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const count = Math.random() * 100 + 1;

    const getUsers = useCallback(() => {
        user.getUsers(companyID).then((res) => {
            fetchUsers({
                users: res.data,
            });
            setIsLoading(false);
        });
    }, [fetchUsers, companyID]);

    useEffect(() => {
        const ac = new AbortController();

        getUsers();
        setIsFetched(true);

        return function cleanup(): void {
            setIsFetched(false);
            ac.abort();
        };
    }, [getUsers]);

    function handleShow(): void {
        setModalShow(true);
        setLoading(false);
    }

    const handleHide = (): void => {
        setModalShow(false);
        setLoading(true);
        fetchUserToEdit({
            editUser: {},
        });
    };

    const handleEdit = (id?: number): void => {
        setModalShow(true);
        setLoading(true);
        try {
            user.editUser(id)
                .then((res) => {
                    fetchUserToEdit({
                        editUser: res.data.user,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    props.addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            console.log(e.response);
        }
    };

    return (
        <>
            <div className="sales-header">
                <h3 className="signage">Service Station Users</h3>
                {!isFetched ? (
                    <div className="list-table">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <AddButton handleShow={handleShow} />
                        {!isLoading && <UsersList getUsers={getUsers} handleEdit={handleEdit} />}
                        {!loading && (
                            <UserModal show={modalShow} onHide={handleHide} getUsers={getUsers} editUser={editUser} />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

Users.propTypes = {
    fetchUsers: PropTypes.any,
    fetchUserToEdit: PropTypes.any,
    addToast: PropTypes.any,
    editUser: PropTypes.object,
};

const mapStateToProps = (state: AppState): UsersState => ({
    editUser: state.usersRoot.editUser,
});

export default connect(mapStateToProps, { fetchUsers, fetchUserToEdit, addToast })(Users);
