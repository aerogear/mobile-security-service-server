import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, TextInput } from '@patternfly/react-core';
import { sortable, cellWidth } from '@patternfly/react-table';
import moment from 'moment';
import { appVersionsTableSort, updateDisabledAppVersion, updateVersionCustomMessage } from '../../actions/actions-ui';
import TableView from '../../components/common/TableView';
import { getSortedAppVersionTableRows } from '../../selectors/index';
import config from '../../config/config';

/**
 * Stateful container to render the TableView presentation component to display app versions
 *
 * @param {object} props Component props
 * @param {string} props.className - Class name of the TableView component
 * @param {string} props.sortBy - Object with column index and direction of the sort
 * @param {boolean} props.appVersionRows - App version row data that will used for rendering
 * @param {func} props.appVersionsTableSort - Action to sort the app versions table
 * @param {func} props.updateDisabledAppVersion - Logic to enable/disable an app version
 * @param {func} props.updateVersionCustomMessage - Logic to update an app versions custom disable message
 */
export const AppVersionsTableContainer = ({
  className,
  sortBy,
  appVersionRows,
  appVersionsTableSort,
  updateDisabledAppVersion,
  updateVersionCustomMessage
}) => {
  const columns = [
    { title: 'APP VERSION', transforms: [ sortable, cellWidth(10) ] },
    { title: 'CURRENT INSTALLS', transforms: [ sortable, cellWidth(10) ] },
    { title: 'LAUNCHES', transforms: [ sortable, cellWidth(10) ] },
    { title: 'LAST LAUNCHED', transforms: [ sortable, cellWidth(15) ] },
    { title: 'DISABLE ON STARTUP', transforms: [ sortable, cellWidth(10) ] },
    { title: 'CUSTOM DISABLE MESSAGE', transforms: [ sortable, cellWidth('max') ] }
  ];

  const handleDisableAppVersionChange = (value, e) => {
    const id = e.target.id;
    updateDisabledAppVersion(id, value);
  };

  const handleCustomMessageInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    updateVersionCustomMessage(id, value);
  };

  const createCheckbox = (id, checked) => {
    return (
      <React.Fragment>
        <Checkbox
          label=""
          isChecked={checked}
          onChange={handleDisableAppVersionChange}
          aria-label="disable app checkbox"
          id={id}
        />
      </React.Fragment>
    );
  };

  const createTextInput = (id, text) => {
    return (
      <React.Fragment>
        <TextInput
          id={id}
          type="text"
          placeholder="Add a custom message.."
          defaultValue={text}
          onBlur={handleCustomMessageInputChange}
          aria-label="Custom Disable Message"
        />
      </React.Fragment>
    );
  };

  const getTable = (versions = []) => {
    const renderedRows = [];
    for (let i = 0; i < versions.length; i++) {
      const tempRow = [];
      tempRow[0] = versions[i][0];
      tempRow[1] = versions[i][1];
      tempRow[2] = versions[i][2];
      if (versions[i][3].isNullOrUndefined || versions[i][3] === 'Never Launched') {
        tempRow[3] = 'Never Launched';
      } else {
        tempRow[3] = moment(versions[i][3]).format(config.dateTimeFormat);
      }
      tempRow[4] = createCheckbox(versions[i][6].toString(), versions[i][4]);
      tempRow[5] = createTextInput(versions[i][6], versions[i][5]);
      renderedRows.push(tempRow);
    }

    return (
      <div className={className}>
        <TableView columns={columns} rows={renderedRows} sortBy={sortBy} onSort={appVersionsTableSort} />
      </div>
    );
  };

  if (!appVersionRows || !appVersionRows.length) {
    return (
      <div className="empty-table-message text-center">
        <p>This app has no versions</p>
      </div>
    );
  }

  return getTable(appVersionRows);
};

AppVersionsTableContainer.propTypes = {
  className: PropTypes.string.isRequired,
  sortBy: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }).isRequired,
  appVersionRows: PropTypes.array.isRequired,
  appVersionsTableSort: PropTypes.func.isRequired,
  updateDisabledAppVersion: PropTypes.func.isRequired,
  updateVersionCustomMessage: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    sortBy: state.app.sortBy,
    appVersionRows: getSortedAppVersionTableRows(state, state.app.sortBy)
  };
}

const mapDispatchToProps = {
  appVersionsTableSort,
  updateDisabledAppVersion,
  updateVersionCustomMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(AppVersionsTableContainer);
