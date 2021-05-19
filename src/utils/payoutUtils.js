import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Typography,
} from '@material-ui/core';

export function isPayoutUnlocked(date) {
    const baseDate = new Date(date);
    const currentDate = new Date();

    if (baseDate.getMonth() < 4 && currentDate.getFullYear() >= baseDate.getFullYear()) {
        return true;
    }

    if (baseDate.getMonth() >= 4 && currentDate.getFullYear() >= baseDate.getFullYear() + 1) {
        return true;
    }

    return false;
}

export function isTechnicalCompleted(phase) {
    return phase.ID !== '00000000-0000-0000-0000-000000000000';
}

export function getNextMay(date) {
    const baseDate = new Date(date);
    const currentDate = new Date();

    if (baseDate.getMonth() < 4 && currentDate.getYear() >= baseDate.getYear()) {
        return new Date(baseDate.getFullYear(), 4, 1).toDateString().split(' ').slice(1).join(' ');
    }

    return new Date(baseDate.getFullYear() + 1, 4, 1).toDateString().split(' ').slice(1).join(' ');
}

export function ForfaitingPayoutDateTitle(props) {
    const { project, ...typographyProps } = props;
    const { t } = useTranslation('translations');

    if (!project?.data?.MonitoringPhase) {
        return null;
    }
    const technicalClosingDate = project.data.MonitoringPhase.CreatedAt;

    if (!isTechnicalCompleted(project.data.MonitoringPhase)) {
        return (
            <Typography {...typographyProps}>
                {t('translations:projects.forfaitingPayoutLocked')}
            </Typography>
        );
    }

    const nextMay = getNextMay(technicalClosingDate);
    if (new Date() >= nextMay) {
        return (
            <Typography {...typographyProps}>
                {`${t('projects.forfaitingPayoutUnlockedOn')} ${nextMay}`}
            </Typography>
        );
    }

    return (
        <Typography {...typographyProps}>
            {`${t('projects.forfaitingPayoutUnlocked')} ${nextMay}`}
        </Typography>
    );
}
