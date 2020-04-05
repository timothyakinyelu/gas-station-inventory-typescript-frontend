/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Sales } from '../../redux/sales/types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { AuthState, User } from '../../redux/auth/types';
import '../../styles/datatable.css';
import { Button } from 'react-bootstrap';
import { UserRoles } from '../../constants';

interface DataTableProps {
    items?: Sales;
    name?: string;
    user: User;
    changePage?: (value: number) => void;
    handleEdit?: (value?: number) => void;
    deleteSelected?: (checkedItems?: any[]) => void;
    getDetails?: (date: any, id?: number, code?: string) => void;
}

const DataTable: React.FC<DataTableProps> = (props): JSX.Element => {
    const items = props.items;

    const [offset] = useState(4);

    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    const [stateObject, setObjectState] = useState<Sales>({
        allChecked: false,
        checkboxes: [],
    });

    useEffect(() => {
        if (items === undefined) {
            return;
        }

        setObjectState({
            allChecked: false,
            checkboxes: items?.data?.map(
                (options, option) => ({
                    ...options,
                    isChecked: false,
                    assigned: 'item' + option,
                }),
                {},
            ),
        });
    }, [items]);

    const isAdmin = props.user.permission === UserRoles.admin;

    function getKeys(): string[] | undefined {
        if (items?.data === undefined) return;
        return Object.keys(items.data[0]);
    }

    const keys = getKeys();

    const handleDelete = (checkedItems: any[]): void => {
        if (props.deleteSelected === undefined) return;
        props.deleteSelected(checkedItems);

        setCheckedItems([]);
    };

    const handleDetails = (date: any, productCodeId?: number, productCode?: string): void => {
        if (props.getDetails === undefined) return;
        props.getDetails(date, productCodeId, productCode);
    };

    const handlePageChange = (value: number): any => {
        if (props.changePage === undefined) return;
        props.changePage(value);
    };

    const handleEdit = (value?: number): any => {
        if (props.handleEdit === undefined) return;
        props.handleEdit(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const itemName = e.target.name;
        const checked = e.target.checked;
        const value = e.target.value;

        let checkboxes = stateObject.checkboxes;
        let allChecked = stateObject.allChecked;

        if (checkboxes === undefined) return;
        if (items === undefined) return;

        if (itemName === 'checkAll') {
            allChecked = checked;
            checkboxes = checkboxes?.map((item) => ({
                ...item,
                isChecked: checked,
            }));

            if (checked === true) {
                setCheckedItems(
                    checkboxes.map((item) => {
                        return item.id;
                    }),
                );
                setObjectState({
                    allChecked: checked,
                    checkboxes: checkboxes,
                });
            } else {
                setCheckedItems([]);

                setObjectState({
                    allChecked: false,
                    checkboxes: checkboxes,
                });
            }
            items.data = checkboxes;
        } else {
            items.data = checkboxes;
            checkboxes = checkboxes.map((item) => {
                return item?.assigned === itemName ? { ...item, isChecked: checked } : item;
            });
            allChecked = checkboxes.every((item) => item?.isChecked);

            if (checked === true) {
                setCheckedItems([...checkedItems, value]);

                setObjectState({
                    allChecked: allChecked,
                    checkboxes: checkboxes,
                });
            } else {
                const removeIndex = checkedItems.indexOf(value);
                checkedItems.splice(removeIndex, 1);

                setObjectState({
                    allChecked: false,
                    checkboxes: checkboxes,
                });
            }
            items.data = checkboxes;
        }
    };

    function sortTable(n: number): void {
        const table: any = document.getElementById('myTable');
        let rows,
            switching: boolean,
            i,
            x,
            y,
            shouldSwitch,
            dir: string,
            switchcount = 0;
        switching = true;
        //Set the sorting direction to ascending:
        dir = 'desc';

        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;

            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < rows.length - 1; i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;

                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName('TD')[n];
                y = rows[i + 1].getElementsByTagName('TD')[n];

                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir === 'desc') {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === 'asc') {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;

                //Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount === 0 && dir === 'desc') {
                    dir = 'asc';
                    switching = true;
                }
            }
        }
    }

    function columnHead(value: string): string {
        return value.split('_').join(' ').toLowerCase();
    }

    function tableHeads(): any {
        const icon = (
            <>
                <i className="mdi mdi-arrow-up"></i>
                <i className="mdi mdi-arrow-down"></i>
            </>
        );

        return keys?.map((column, index) => {
            if (column !== 'isChecked' && column !== 'id' && column !== 'assigned') {
                return (
                    <th scope="col" className="table-head" key={index} onClick={(): void => sortTable(index)}>
                        {columnHead(column)}
                        {column === 'product_code_id' && icon}
                    </th>
                );
            }
        });
    }

    const showKey = (key: string, index: number, data: any): any => {
        const formatter = new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        });
        const peg = key.split('_').join(' ').toLowerCase();

        if (key !== 'isChecked' && key !== 'id' && key !== 'assigned') {
            return (
                <td data-label={peg} key={index}>
                    {key === 'total_sale' ? formatter.format(data[key]) : data[key]}
                </td>
            );
        }
    };

    function dataList(): any {
        if (items?.data === undefined) return;
        if (items.data.length) {
            return items.data.map((data, index) => {
                return (
                    <tr key={index}>
                        {isAdmin && data.id && (
                            <td>
                                <input
                                    type="checkbox"
                                    name={'item' + index}
                                    value={data.id}
                                    checked={data.isChecked || false}
                                    onChange={handleChange}
                                    key={index}
                                />
                            </td>
                        )}
                        {Object.keys(data).map((key, index) => showKey(key, index, data))}
                        {isAdmin && data.id ? (
                            <td>
                                <i
                                    className="mdi mdi-square-edit-outline btnDetail"
                                    data-label="edit"
                                    onClick={(): void => handleEdit(data.id)}
                                ></i>
                            </td>
                        ) : (
                            isAdmin && (
                                <td>
                                    <i
                                        className="mdi mdi-folder-information-outline btnDetail"
                                        onClick={(): void =>
                                            handleDetails(data.date, data.product_code_id, data.product_code)
                                        }
                                    ></i>
                                </td>
                            )
                        )}
                    </tr>
                );
            });
        } else {
            return (
                <tr>
                    <td colSpan={keys?.length} className="text-center">
                        No Records Found.
                    </td>
                </tr>
            );
        }
    }

    function pages(): any {
        if (!items?.to) {
            return [];
        }

        const pages = [];
        if (items.current_page === undefined) return;
        let from = items.current_page - Math.floor(offset / 2);
        if (from < 1) {
            from = 1;
        }
        let to = from + offset - 1;
        if (items.last_page === undefined) return;
        if (to > items.last_page) {
            to = items.last_page;
        }
        while (from <= to) {
            pages.push(from);
            from++;
        }
        return pages;
    }

    function pageList(): any {
        return pages().map((page: number) => {
            return (
                <li className={page === items?.current_page ? 'page-item active' : 'page-item'} key={page}>
                    <button className="page-link" onClick={(): void => handlePageChange(page)}>
                        {page}
                    </button>
                </li>
            );
        });
    }

    return (
        <div>
            <div className="data-table">
                {checkedItems.length > 0 && (
                    <div className="row">
                        <span style={{ paddingRight: '10px', paddingTop: '2px' }}>
                            <p>{checkedItems.length} selected</p>
                        </span>
                        <Button
                            bsPrefix="lgBtn"
                            onClick={(): void => handleDelete(checkedItems)}
                            className="btn-delete"
                        >
                            Delete
                        </Button>
                    </div>
                )}
                <table id="myTable" className="table responsive-table">
                    <caption>{props.name} Sales Table</caption>
                    <thead className="table-header">
                        <tr>
                            {keys !== undefined
                                ? isAdmin &&
                                  keys[0] === 'id' && (
                                      <th>
                                          <input
                                              type="checkbox"
                                              id="checkall"
                                              name="checkAll"
                                              checked={stateObject.allChecked || false}
                                              onChange={handleChange}
                                          />
                                      </th>
                                  )
                                : ''}
                            {tableHeads()}
                            {isAdmin && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>{dataList()}</tbody>
                </table>
                {items?.last_page !== undefined && items?.current_page !== undefined
                    ? items?.last_page >= items?.current_page && (
                          <nav style={{ float: 'right' }}>
                              <ul className="pagination">
                                  <li className="page-item">
                                      <button
                                          className={1 === items?.current_page ? 'page-link disabled' : 'page-link'}
                                          disabled={1 === items?.current_page}
                                          onClick={(): void => {
                                              if (items.current_page === undefined) return;
                                              handlePageChange(items.current_page - 1);
                                          }}
                                      >
                                          Previous
                                      </button>
                                  </li>
                                  {pageList()}
                                  <li className="page-item">
                                      <button
                                          className={
                                              items?.last_page === items?.current_page
                                                  ? 'page-link disabled'
                                                  : 'page-link'
                                          }
                                          disabled={items?.last_page === items?.current_page}
                                          onClick={(): void => {
                                              if (items.current_page === undefined) return;
                                              handlePageChange(items.current_page + 1);
                                          }}
                                      >
                                          Next
                                      </button>
                                  </li>
                                  <span className="pagination-total" style={{ marginTop: '8px' }}>
                                      {' '}
                                      &nbsp;
                                      <i>
                                          Showing {items?.data?.length} of {items?.total} items.
                                      </i>
                                  </span>
                              </ul>
                          </nav>
                      )
                    : ''}
            </div>
        </div>
    );
};

DataTable.propTypes = {
    items: PropTypes.any,
    name: PropTypes.string,
    user: PropTypes.any,
    getDetails: PropTypes.func,
    handleEdit: PropTypes.func,
    changePage: PropTypes.func,
    deleteSelected: PropTypes.func,
};

const mapStateToProps = (state: AppState): AuthState => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
});

export default connect(mapStateToProps)(DataTable);
