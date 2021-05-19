import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, GeoJSON, Popup } from 'react-leaflet';

import Latvia from './../../constants/GeoJSON/LVA.geo.json';
import Slovakia from './../../constants/GeoJSON/SVK.geo.json';
import Poland from './../../constants/GeoJSON/POL.geo.json';
import Bulgaria from './../../constants/GeoJSON/BUL.geo.json';
import Romania from './../../constants/GeoJSON/ROU.geo.json';
import Austria from './../../constants/GeoJSON/AUT.geo.json';

import styles from './styles';

class IndexMap extends React.Component {
  state = {
    lat: 51.73743,
    lng: 20.57549,
    zoom: window.innerWidth <= 600 ? 4 : 4.8,
    popUp: null,
    defaultStyle: {
      fillOpacity: 0.35,
      fillColor: '#000',
      color: 'rgba(255,255,255,0.5)'
    }
  }

  resetAllStyles = () => {
    let {
      latvia,
      slovakia,
      poland,
      bulgaria,
      romania,
      austria,
    } = this;

    [
      latvia,
      slovakia,
      poland,
      bulgaria,
      romania,
      austria,
    ].forEach(country => country.setStyle(this.state.defaultStyle))
  }

  onEachFeature = (feature, layer) => {
   layer.on({
     mouseover: this.highlightFeature,
    //  mouseout: this.resetHighlight,
    //  click: this.clickToFeature
   })
  }

  highlightFeature = ({ target }) => {
    let { center, name } = target.feature.properties;
    let { allAssetsNumber, allOrganizationsNumber, allProjectsNumber } = this.props;
    this.setPopUp(name, center, allAssetsNumber, allOrganizationsNumber, allProjectsNumber);

    this.resetAllStyles(target)
    target.setStyle({ fillColor: 'yellow', fillOpacity: 0.35 })
  }
  // resetHighlight = ({ target }) => target.setStyle(this.state.defaultStyle)

  setPopUp = ( name, location, allAssetsNumber, allOrganizationsNumber, allProjectsNumber ) => {
    const { classes, countries } = this.props;
    let popUp = (
      <Popup className='index-map-popup' closeButton={false} position={location} >
        <span>
          <div className={classes.nameStyle}>{name}</div>
          <hr className={classes.dividerStyle}/>
          <div className='row'>
            <div className={`col-xs ${classes.popUpTextStyle}`}>Assets</div>
            <div className={`col-xs ${classes.popUpValuesStyle}`}>
              <span style={{float: 'right'}}>
                {countries[name] ? countries[name].assets : 0}
              </span>
            </div>
          </div>
          <div className='row'>
            <div className={`col-xs ${classes.popUpTextStyle}`}>Projects</div>
            <div className={`col-xs ${classes.popUpValuesStyle}`}>
              <span style={{ float: 'right' }}>
              {countries[name] ? countries[name].projects : 0}
              </span>
            </div>
          </div>
          <div className='row'>
            <div className={`col-xs ${classes.popUpTextStyle}`}>Organizations</div>
            <div className={`col-xs ${classes.popUpValuesStyle}`}>
              <span style={{float: 'right'}}>
              {countries[name] ? countries[name].organizations : 0}
              </span>
            </div>
          </div>
        </span>
      </Popup>
    )

    this.setState({ popUp });
  }

  style = feature => this.state.defaultStyle;

  render() {
    const position = [this.state.lat, this.state.lng];
    const { popUp } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.containerStyle} >
        <div className='row center-xs' style={{ height: '100%' }}>
          <Map
            center={position}
            zoom={this.state.zoom}
            zoomControl={true}
            touchZoom={false}
            boxZoom={true}
            keyboard={true}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            dragging={true}
            zoomSnap={0.1}
            minZoom={2}
            maxBounds={[
              [-200, 200],
              [200, -200]
            ]}
            onClick={() => {
              this.setState({ popUp: null });
              this.resetAllStyles();
          }}>
            <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'/>
            {popUp ? popUp : null}

            <GeoJSON
              data={ Latvia }
              style={ this.style }
              onEachFeature={ this.onEachFeature }
              ref={el => (this.latvia = el) }
            />

            <GeoJSON
              data={ Slovakia }
              style={ this.style }
              onEachFeature={ this.onEachFeature }
              ref={el => (this.slovakia = el) }
            />

            <GeoJSON
              data={ Poland }
              style={ this.style }
              onEachFeature={ this.onEachFeature }
              ref={el => (this.poland = el) }
            />

            <GeoJSON
              data={ Bulgaria }
              style={ this.style }
              onEachFeature={ this.onEachFeature }
              ref={el => (this.bulgaria = el) }
            />

            <GeoJSON
              data={ Romania }
              style={ this.style }
              onEachFeature={ this.onEachFeature }
              ref={el => (this.romania = el) }
            />

            <GeoJSON
              data={ Austria }
              style={ this.style }
              onEachFeature={ this.onEachFeature }
              ref={el => (this.austria = el) }
            />
          </Map>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(IndexMap);
