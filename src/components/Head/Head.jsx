import { Helmet } from 'react-helmet-async';

/**
 * @typedef {Object} HeadProps
 * @property {string} [title='']
 * @property {string} [description='']
 */

/**
 * @param {HeadProps} props
 * @returns {JSX.Element}
 */
export const Head = ({ title = '', description = '' } = {}) => {
  return (
      <Helmet
          title={title ? `${title} | Bulletproof React` : undefined}
          defaultTitle="Bulletproof React"
      >
        <meta name="description" content={description} />
      </Helmet>
  );
};
