import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { nullUUID } from '../../../utils/uuid';
import FAReview from './FAReview';

function FAReviews(props) {
  const {
    reviewTypes,
    faReviews,
    projectID,
    buttonLabels,
    handleReview,
    reviewProps,
    disabled,
  } = props;
  const { t } = useTranslation('translations');

  const reviewsMap = {};
  reviewTypes.forEach(rt => {
    reviewsMap[rt] = {
      review: null,
      type: rt,
      history: [],
      disabled,
      notice: null,
      buttonLabel: buttonLabels[rt] ? buttonLabels[rt] : undefined,
    };
  });

  for (const k in faReviews) {
    const rt = faReviews[k].type;
    // If unknown review type - nothing to do.
    if (!reviewsMap[rt]) {
        continue;
    }
    if (reviewsMap[rt].review) {
        reviewsMap[rt].history.push({ ...faReviews[k] });
        continue;
    }
    // If review not approved, but EXECUTIVE review present
    // and set to being able to complete - disable it.
    if (rt !== 'EXECUTIVE' && !faReviews[k].approved && reviewsMap.EXECUTIVE && !reviewsMap.EXECUTIVE.disabled) {
        reviewsMap.EXECUTIVE = {
            ...reviewsMap.EXECUTIVE,
            disabled: true,
            notice: t('projects.forgaitinbPtojectNotFullyApproved'),
        };
    }
    reviewsMap[rt].review = { ...faReviews[k] };
  }

  const reviews = Object.values(reviewsMap);
  const { ReviewComponent, ...restReviewProps } = reviewProps;
  return (
    reviews.map((r, i) => {
      return (
        <ReviewComponent {...restReviewProps} key={i}>
          <FAReview
              handleReview={handleReview}
              disabled={r.disabled}
              notice={r.notice}
              review={r.review || { type: r.type, ID: nullUUID }}
              projectID={projectID}
              reviewHistory={r.history}
              buttonLabel={r.buttonLabel}
          />
        </ReviewComponent>
      );
    })
  );
}

FAReviews.propTypes = {
  reviewTypes: PropTypes.array.isRequired,
  faReviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonLabels: PropTypes.object,
  handleReview: PropTypes.func.isRequired,
  reviewProps: PropTypes.shape({ ReviewComponent: PropTypes.elementType, className: PropTypes.string }),
  disabled: PropTypes.bool,
};

FAReviews.defaultProps = {
  reviewTypes: [],
  faReviews: [],
  reviewProps: { ReviewComponent: React.Fragment },
  disabled: false,
};

export default FAReviews;
