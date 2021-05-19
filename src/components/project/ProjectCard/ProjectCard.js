import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  Create as ContentCreate,
  InfoOutlined as InfoIcon
} from '@material-ui/icons';

import ProjectEditor from '../ProjectEditor/ProjectEditor';
import { canViewPublicProjects } from '../../../utils/can';
import airIcon from './../../../images/svgIcons/plant.svg';
import thermometer from './../../../images/svgIcons/thermometer.svg';
import wrench from './../../../images/svgIcons/wrench.svg';
import energy from '../../../images/svgIcons/energy.svg';
import { assetTypeImage } from '../../../constants/assetTypes';
import { parseAddress } from '../../asset/utils';
import TooltipWrapper from '../../utils/TooltipWrapper';
import UserTooltip from '../../utils/UserTooltip';
import styles from './styles';

import { isPayoutUnlocked, getNextMay, isTechnicalCompleted } from '../../../utils/payoutUtils';

const useStyles = makeStyles(styles);

// eslint-disable-next-line complexity
function ProjectCard(props) {
  const {
    overview, data, singleProjectReady, singleAsset, singleOrganization,
    toggleEditProjectDialog, isProjectDialogOpen,
    loggedUserRole, userIsSuperUser, projectClientName, typeOfView, user,
    forfaitingApplication
  } = props;

  const assetIMG = overview ? assetTypeImage(data.dependencies[data.data.asset].data) : assetTypeImage(data.data.asset.data); // eslint-disable-line max-len

  const { t } = useTranslation('translations');
  const classes = useStyles();

  const Validated = ({ valid }) => {
    let className = {};
    let textInside = '';
    switch (valid) {
      case 1:
        className = classes.registeredStyle;
        textInside = t('translations:validStatus.planning');
        break;
      case 2:
        className = classes.pendingStyle;
        textInside = t('translations:validStatus.inProgress');
        break;
      case 3:
        className = classes.validStyle;
        textInside = t('translations:validStatus.finished');
        break;
      case 4:
        className = classes.declinedStyle;
        textInside = t('translations:validStatus.abandoned');
        break;
      default:
        break;
    }
    return (
      <div className={className} style={{ width: '82px' }}>
        {textInside}
      </div>
    );
  };
  const technicalClosingDate = data.data.MonitoringPhase.CreatedAt;
  const hasPermitionToEnter = typeOfView === 'private' || canViewPublicProjects(user);
  const guaranteedMetrics = {
    airtemp: data.data?.airtemp > 0 ? `${data.data.airtemp} °C` : '-',
    watertemp: data.data?.watertemp > 0 ? `${data.data.watertemp} °C` : '-',
    savings: data.data?.savings > 0 ? `${data.data.savings}%` : '-',
  };

  return (
    <div>
      {overview
        ? <div className="box">
          <Card className={`box ${classes.prjCardBaseOverview}`} classes={{ root: classes.root }}>
            <div className="image">
              <img
                className={classes.objectFitFillPrivate}
                src={assetIMG}
                alt={data.data.name}
              />
            </div>
            <Validated valid={data.data.status} />
            {loggedUserRole === 'pm' || userIsSuperUser === true
              ? <IconButton
                className={classes.addingButtonStyle}
                onClick={toggleEditProjectDialog}
              >
                <ContentCreate />
              </IconButton>
              : null
            }
            <div className={`row ${classes.infoContainer}`}>
              <div className={`col-xs-6 col-sm-4 col-md-4 ${classes.rowContnent}`}>
                <div className={`row ${classes.title}`}>
                  {singleProjectReady ? data.data.name : ''}
                </div>
                <div className={`row ${classes.subTitle}`}>
                  {t('translations:projects.name')}
                </div>
              </div>
              <div className={`col-xs-6 col-sm-4 col-md-4 ${classes.rowContnent}`}>
                <Link to={`/organization/${singleOrganization._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div className={`row ${classes.title}`}>
                    {singleProjectReady ? singleOrganization.data.name : ''}
                  </div>
                </Link>
                <div className={`row ${classes.subTitle}`}>
                  {t('translations:projects.projectOwner')}
                </div>
              </div>
              <div className={`col-xs-6 col-sm-2 col-md-2 ${classes.rowContnent}`}>
                <div className={`row ${classes.title}`}>
                  {singleProjectReady ? data.data.contract_term : ''} {t('translations:projects.years')}
                </div>
                <div className={`row ${classes.subTitle}`}>
                  {t('translations:projects.contractTerms')}
                </div>
              </div>
              <div className={`col-xs-6 col-sm-2 col-md-2 ${classes.rowContnent}`}>
                <div className={`row ${classes.title}`}>
                  {singleProjectReady ? data.data.first_year : ''}
                </div>
                <div className={`row ${classes.subTitle}`}>
                  {t('translations:projects.firstYearOfContract')}
                </div>
              </div>
            </div>
            <Divider />
            <div className="row" style={{ padding: 10 }}>
              <div className={`col-xs-12 col-sm-4 ${classes.rowContnent}`}>
                <div className={`row ${classes.title}`}>
                  {singleProjectReady ? projectClientName : ''}
                </div>
                <div className={`row ${classes.subTitle}`}>
                  {t('translations:projects.projectClient')}
                </div>
              </div>
              <div className={`col-xs-12 col-sm-8 ${classes.rowContnent}`}>
                <Link to={`/asset/${singleAsset._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div className={`row ${classes.title}`}>
                    {singleProjectReady ? parseAddress(singleAsset.data.address) : ''}
                  </div>
                </Link>
                <div className={`row ${classes.subTitle}`}>
                  {t('translations:projects.building')}
                </div>
              </div>
            </div>
            <Divider />
            <div className="box boxes-container" style={{ padding: '0 15px' }}>
              <Typography className={classes.metricTitle} component="div">
                {t('translations:projects.guaranteedMetricsUnderContractTerms')}
                <UserTooltip
                  icon={<InfoIcon />}
                  title={t('tooltips:projects.guaranteedMetrics')}
                  action="click"
                />
              </Typography>
              <div className="row center-xs">
                <div className={`col-xs-6 col-sm-3 col-md-3 col-lg-3 ${classes.noPaddingNoMargin}`}>
                  <div className={classes.projectCardInfoBoxElement} style={{ border: '2px solid #2096F3' }}>
                    <InfoBox classes={classes} boxBackgroundColor="#2096F3" label={t('translations:projects.indoorAirTemperature')}
                      info={guaranteedMetrics.airtemp} icon={airIcon} />
                  </div>
                </div>
                <div className={`col-xs-6 col-sm-3 col-md-3 col-lg-3 ${classes.noPaddingNoMargin}`}>
                  <div className={classes.projectCardInfoBoxElement} style={{ border: '2px solid #d65b4a' }}>
                    <InfoBox classes={classes} boxBackgroundColor="#d65b4a" label={t('translations:projects.domesticWaterTemp')}
                      info={guaranteedMetrics.watertemp} icon={thermometer} />
                  </div>
                </div>
                <div className={`col-xs-6 col-sm-3 col-md-3 col-lg-3 ${classes.noPaddingNoMargin}`}>
                  <div className={classes.projectCardInfoBoxElement} style={{ border: '2px solid #FEC24B' }}>
                    <InfoBox classes={classes} boxBackgroundColor="#FEC24B" label={t('translations:projects.energySavings')} icon={energy}
                      info={guaranteedMetrics.savings} />
                  </div>
                </div>
                <div className={`col-xs-6 col-sm-3 col-md-3 col-lg-3 ${classes.noPaddingNoMargin}`}>
                  <div className={classes.projectCardInfoBoxElement} style={{ border: '2px solid #66B82E' }}>
                    <InfoBox classes={classes} boxBackgroundColor="#66B82E" label={t('translations:projects.constructionPeriod')} icon={wrench}
                      info={singleProjectReady ? moment(data.data.construction_from).format('DD.MM.YYYY') + ' ' + moment(data.data.construction_to).format('DD.MM.YYYY') : 'N/A'} />
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div className={`row ${classes.forfaitingContainer}`}>
              <div className="col-xs-12 col-md-6">
                <Typography className={classes.forfaitingInfoTitle}>
                  {t('translations:forfaitingApplication.forfaitingContact')}
                </Typography>
                {
                  forfaitingApplication ?
                    <React.Fragment>
                      <Typography className={classes.forfaitingInfoText}>
                        {forfaitingApplication.manager.name}
                      </Typography>
                      <Typography className={classes.forfaitingInfoText}>
                        {forfaitingApplication.manager.email}
                      </Typography>
                    </React.Fragment> :
                    <Typography className={classes.forfaitingInfoText}>
                      {t('translations:projects.positionNotAssigned')}
                    </Typography>
                }
              </div>
              <div className="col-xs-12 col-md-6">
                <Typography className={classes.forfaitingInfoTitle}>
                  {t('translations:projects.forfaitingPayoutStatus')}
                </Typography>
                {isTechnicalCompleted(data.data.MonitoringPhase) ?
                  isPayoutUnlocked(technicalClosingDate) ?
                    <Typography className={classes.forfaitingInfoText}>
                      {t('translations:projects.forfaitingPayoutReady')}
                    </Typography> :
                    <Typography className={classes.forfaitingInfoText}>
                      {`${t('translations:projects.forfaitingPayoutUnlocked')} ${getNextMay(technicalClosingDate)}`}
                    </Typography> :
                  <Typography className={classes.forfaitingInfoText}>
                    {t('translations:projects.forfaitingPayoutLocked')}
                  </Typography>
                }
              </div>
            </div>
          </Card>
          <ProjectEditor
            open={isProjectDialogOpen}
            handleClose={toggleEditProjectDialog}
            title={t('projects.editProject')}
            data={
              {
                ...data.data,
                consortium_organizations: data.data.consortium_organizations?.map(v => {
                  for (const dep in data.dependencies) {
                    if (dep === v) {
                      return { value: v, label: data.dependencies[dep].data.name };
                    }
                  }
                  return null;
                })
              }
            }
          />
        </div>
        : <TooltipWrapper title={data.data.name}>
          <div className="col-xs" style={{ width: '300px' }}>
            <Card className={classes.prjCardBasePrjsList} classes={{ root: classes.root }}>
              <Link to={hasPermitionToEnter ? `project/${data._id}` : '/projects'} style={{ textDecoration: 'none' }}>
                <CardContent className={classes.cardContentName}>
                  {data.data.name}
                </CardContent>
                <div className="image">
                  <img className={classes.objectFitFill} src={assetIMG} alt={data.data.name} />
                </div>
                <Validated valid={data.data.status} />
                <div className={classes.prjListTitles}>
                  <div className="row">
                    {/* <CardContent className={classes.cardContentTitle}>
                        Owner
                      </CardContent> */}
                    <CardContent className={classes.cardContentText}>
                      {/* { data.data.organization.data.name } */}
                    </CardContent>
                  </div>
                  <Divider />
                  <div className="row between-xs">
                    <CardContent className={classes.cardContentTitle}>
                      {t('translations:projects.client')}
                    </CardContent>
                    <CardContent className={classes.cardContentText}>
                      {data.data.asset.data.owner.data.name}
                    </CardContent>
                  </div>
                  <Divider />
                  <div className="row between-xs">
                    <CardContent className={classes.cardContentTitle}>
                      {t('translations:projects.building')}
                    </CardContent>
                    <CardContent className={classes.cardContentText}>
                      {parseAddress(data.data.asset.data.address)}
                    </CardContent>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        </TooltipWrapper>
      }
    </div>
  );
}

const InfoBox = ({ label, info, boxBackgroundColor, classes, icon }) => (
  <div>
    <div style={{ backgroundColor: boxBackgroundColor }} className={classes.prjCardBoxLabel}>
      {info}
    </div>
    <img alt="Register Asset" src={icon} width="30px" height="30px" />
    <div className={`center-xs ${classes.prjCardBoxText}`}>
      {label}
    </div>
  </div>
);

export default connect(
  state => ({
    user: state.user,
  }),
)(ProjectCard);
