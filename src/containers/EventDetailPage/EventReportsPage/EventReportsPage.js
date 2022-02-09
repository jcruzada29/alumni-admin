import React from 'react';
import { Segment, Table, Icon } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import Papa from 'papaparse';
import { compose } from 'redux';
import { withAlert } from 'react-alert';
import XLSX from 'xlsx';
import _ from 'lodash';
import moment from 'moment';

class EventReportsPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			report_type: ''
		};
	}

	componentWillUnmount() {
		this.props.reset();
	}

	getReportTypeName = (value) => {
		switch (value) {
			case 'event_registration_participant':
				return 'Event Registration Participant';
			case 'attendance':
				return 'Attendance';
			case 'paid_transactions':
				return 'Paid Transactions';
			case 'master_report':
				return 'Master Report';
			default:
		}
		return 'Unknown';
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta,
			hasDownloadSuccess: prev_hasDownloadSuccess
		} = prevProps.pageProps;
		const {
			meta,
			hasDownloadSuccess
		} = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		// Download
		if (hasDownloadSuccess && hasDownloadSuccess !== prev_hasDownloadSuccess) {
			const { csv_string: downloadCsv } = this.props.pageProps;
			const { report_type } = this.state;
			if (downloadCsv) {
				const reportTypeName = this.getReportTypeName(report_type);
				if(report_type === 'master_report'){
					this.downloadMultipleSheetsXlsx({
						csv: downloadCsv,
						fileName: `${reportTypeName} - ${moment().format('YYYY-MM-DD HH-mm-ss')}.xlsx`
					});
				} else {
					this.downloadXlsx({
						csv: downloadCsv,
						fileName: `${reportTypeName} - ${moment().format('YYYY-MM-DD HH-mm-ss')}.xlsx`
					});
				}

				// this.downloadCsv({
				// 	csv: downloadCsv,
				// 	fileName: `Reports - Booking ${reportTypeName} - ${moment().format('YYYY-MM-DD HH-mm-ss')}.csv`
				// });
			}
			this.setState({ report_type: '' });
		}
	}

	downloadXlsx = ({ csv, fileName }) => {
		const bookingSummaryCsvRows = (Papa.parse(csv)).data;

		const wb = XLSX.utils.book_new();

		// booking summary ws
		const bookingWs = XLSX.utils.aoa_to_sheet(bookingSummaryCsvRows);
		XLSX.utils.book_append_sheet(wb, bookingWs, 'Events');

		if (navigator && navigator.msSaveOrOpenBlob) {
			const data = XLSX.write(wb, {
				type: 'array',
				bookType: 'xlsx'
			});
			const blob = new Blob([data]);
			navigator.msSaveOrOpenBlob(blob, fileName);
			return;
		}

		// write to b64
		const fileBase64 = XLSX.write(wb, {
			type: 'base64',
			bookType: 'xlsx'
		});

		const encodedUri = encodeURI(`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileBase64}`);
		let a = document.createElement('a');
		document.body.appendChild(a);
		a.href = encodedUri;
		a.download = fileName;
		a.click();
	}

	downloadMultipleSheetsXlsx = ({ csv, fileName }) => {

		const wb = XLSX.utils.book_new();

		if(!csv.length && !csv) {
			return;
		}

		csv.map(v => {
			const parseData = (Papa.parse(v.data)).data;
			// booking summary ws
			const bookingWs = XLSX.utils.aoa_to_sheet(parseData);
			XLSX.utils.book_append_sheet(wb, bookingWs, v.name);
		});

		if (navigator && navigator.msSaveOrOpenBlob) {
			const data = XLSX.write(wb, {
				type: 'array',
				bookType: 'xlsx'
			});
			const blob = new Blob([data]);
			navigator.msSaveOrOpenBlob(blob, fileName);
			return;
		}

		// write to b64
		const fileBase64 = XLSX.write(wb, {
			type: 'base64',
			bookType: 'xlsx'
		});

		const encodedUri = encodeURI(`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileBase64}`);
		let a = document.createElement('a');
		document.body.appendChild(a);
		a.href = encodedUri;
		a.download = fileName;
		a.click();
	}

	downloadCsv = ({ csv, fileName }) => {
		if (navigator && navigator.msSaveBlob) {
			const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
			navigator.msSaveBlob(blob, fileName);
			return;
		}
		const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
		let a = document.createElement('a');
		document.body.appendChild(a);
		a.href = encodedUri;
		a.download = fileName;
		a.click();
	}

	confirmDownload = type => {
		const { query } = UrlParse(this.props.location.search, true);
		if (window.confirm('Are you sure you want to download?')) {
			this.props.downloadReports({ event_id: query.id, type });
			this.setState({ report_type: type });
		}
	}

	render() {
		console.log('props alert', this.props);
		return (
			<div className="bt-content-padded">
				<Segment style={{ height: '600px' }}>
					<Table singleLine>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell width={14}>Report</Table.HeaderCell>
								<Table.HeaderCell width={2}>Actions</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell collapsing>Registered Participants</Table.Cell>
								<Table.Cell
									style={{ fontWeight: 'bold', color: '#0074bc' }}
									onClick={() => this.confirmDownload('event_registration_participant')}
								>
									<Icon name="cloud download" /> 
										Download
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Attendance Record</Table.Cell>
								<Table.Cell 
									style={{ fontWeight: 'bold', color: '#0074bc' }}
									onClick={() => this.confirmDownload('attendance')}
								>
									<Icon name="cloud download" /> 
									Download
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Paid Transactions (Payment Records)</Table.Cell>
								<Table.Cell 
									style={{ fontWeight: 'bold', color: '#0074bc' }}
									onClick={() => this.confirmDownload('paid_transactions')}
								>
									<Icon name="cloud download" /> 
									Download
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Master Report</Table.Cell>
								<Table.Cell 
									style={{ fontWeight: 'bold', color: '#0074bc' }}
									onClick={() => this.confirmDownload('master_report')}
								>
									<Icon name="cloud download" /> 
									Download
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Segment>
			</div>
		);
	}
}

export default compose(
	withAlert(),
)(EventReportsPage);