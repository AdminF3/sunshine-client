import React from 'react';

import gbFlag from './../../images/flags/english.svg';
import latviaFlag from './../../images/flags/latvia.svg';
import bulgarianFlag from '../../images/flags/bulgaria.svg';
import slovakFlag from '../../images/flags/slovak.png';
import austrianFlag from '../../images/flags/austria.png';
import romanianFlag from '../../images/flags/romania.png';
import polishFlag from '../../images/flags/poland.png';
import europeanFlag from '../../images/flags/europe.svg';

export const LV = ({ alt, width, height, padding, style, className }) => (
  <img src={latviaFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export const EN = ({ alt, width, height, padding, style, className }) => (
  <img src={gbFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export const BG = ({ alt, width, height, padding, style, className }) => (
  <img src={bulgarianFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export const SK = ({ alt, width, height, padding, style, className }) => (
  <img src={slovakFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export const AT = ({ alt, width, height, padding, style, className }) => (
  <img src={austrianFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export const RO = ({ alt, width, height, padding, style, className }) => (
  <img src={romanianFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export const PL = ({ alt, width, height, padding, style, className }) => (
  <img src={polishFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export const EU = ({ alt, width, height, padding, style, className }) => (
  <img src={europeanFlag} alt={alt} className={className} style={{
    width: `${width-padding}px`,
    height: `${height-padding}px`,
    padding: `${padding}px`,
    ...style
  }} />
);

export function CountryFlag({ country }) {
  const flagProps = { width: 31, height: 21, padding: 0};

  switch (country) {
    case 'England':
      return <EN {...flagProps} />;
    case 'Latvia':
      return <LV {...flagProps} />;
    case 'Bulgaria':
      return <BG {...flagProps} />;
    case 'Slovakia':
      return <SK {...flagProps} />;
    case 'Austria':
      return <AT {...flagProps} />;
    case 'Romania':
      return <SK {...flagProps} />;
    case 'Poland':
      return <PL {...flagProps} />;
    default:
      return <EU {...flagProps} />;
  }
}
