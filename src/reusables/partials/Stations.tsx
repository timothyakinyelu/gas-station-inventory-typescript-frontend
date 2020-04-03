/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import '../../styles/stations.css';
import { AppState } from '../../redux';
import { CentralState, Station } from '../../redux/central/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

interface StationsProps {
    stations?: Station[];
    selectedStation?: Station;
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Stations: React.FC<StationsProps> = ({ stations, selectedStation, handleSelect }): JSX.Element => {
    const [objects, setObjects] = useState<Station[] | undefined>([]);
    useEffect(() => {
        async function onLoad(): Promise<any> {
            if (!stations) {
                return;
            }

            setObjects(stations);
        }

        onLoad();
    }, [stations]);

    const options = (): any => {
        if (objects) {
            return objects.map((station) => {
                return (
                    <option key={station.id} value={station.id} data-name={station.slug}>
                        {station.name}
                    </option>
                );
            });
        }
    };

    return (
        <>
            <div className="select">
                <select name="slct" id="slct" value={selectedStation?.id || ''} onChange={(e): void => handleSelect(e)}>
                    <option disabled value="">
                        Choose an option to view
                    </option>
                    {options()}
                </select>
            </div>
            {/* <span>Select station to view sales!</span> */}
        </>
    );
};

Stations.propTypes = {
    stations: PropTypes.array,
    selectedStation: PropTypes.any,
    handleSelect: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    stations: state.center.stations,
});

export default connect(mapStateToProps)(Stations);
