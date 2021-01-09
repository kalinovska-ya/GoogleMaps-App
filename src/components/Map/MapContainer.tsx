import React from 'react';
import { connect } from 'react-redux';
import { setStationsAC } from '../../redux/reducers/map-reduser';
import { AppStateType } from '../../redux/store';
import { convertDataToObject } from '../../utils/ConvertDataUtils';
import Map from './Map';

type Props = {
  mapType: google.maps.MapTypeId
  mapTypeControl?: boolean
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface MapProps extends StateProps, DispatchProps { }
interface MapState extends StateProps { }

class MapContainer extends React.Component<MapProps, MapState> {
  componentDidMount() {
    const { setStations } = this.props;
    const proxyurl = "https://powerful-depths-31495.herokuapp.com/";
    const url = "http://www.minsktrans.by/city/minsk/stops.txt";
    fetch((proxyurl + url), { method: 'GET' }).then(x => {
      return x.text()
    }).then((response) => {
      let a = convertDataToObject(response);
      setStations(a);
    }).catch(() => console.log("Can’t access " + url + " response."));
  }

  render() {
    const { stations, mapType, mapTypeControl } = this.props;
    return <Map mapType={mapType} mapTypeControl={mapTypeControl} stations={stations} />
  }
}


let mapStateToProps = (state: AppStateType, ownProps: Props) => {
  return {
    stations: state.map.stations,
    mapType: ownProps.mapType,
    mapTypeControl: ownProps.mapTypeControl,
  }
}

let mapDispatchToProps = { setStations: setStationsAC };



export default connect(mapStateToProps, { setStations: setStationsAC })(MapContainer);