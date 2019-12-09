import React from 'react'
import { Table, Button } from 'antd';
import BaseDataEdit from './BaseDataEdit';


export default class BaseData extends React.Component {





	constructor(props) {
		super(props);

		let columns = [
			{
				title: '分类编号',
				dataIndex: 'ec_id',
				width: '20%',
			},
			{
				title: '分类名称',
				dataIndex: 'ec_name',
				width: '20%',
			},
			{
				title: '排序',
				dataIndex: 'sort',
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<Button type="primary" onClick={() => {
							this.operationData(record,true)
						}} >查看</Button>
						<Button type="primary" onClick={() => {
							this.operationData(record,false)
						}} style={{ margin: "0px 5px 0px 5px" }}>编辑</Button>
						<Button type="danger">删除</Button>
					</span>
				),
			},
		];

		this.state = {
			pageSize: 10,
			current: 1,
			total: 0,
			data: [],
			showModal: false,
			modalText: "添加分类",
			loading: false,
			columns: columns
		}


		this.operationData = this.operationData.bind(this);
	}

	componentDidMount() {
		this.getDatas();
	}




	onChange(page, pageSize) {
		this.setState({
			current: page
		}, () => {
			this.getDatas();
		});
	}

	onShowSizeChange(current, size) {
		this.setState({
			pageSize: size
		}, () => {
			this.getDatas();
		});
	}

	getDatas = (params = {}) => {
		this.setState({ loading: true });
		React.$axios
			.post("/admin/example_category/index", {
				page: this.state.current,
				per_page: this.state.pageSize
			})
			.then(res => {
				this.setState({
					loading: false,
					total: res.data.total,
					current: res.data.current_page,
					data: res.data.data
				});
			});
	}

	operationData = (params, isCheck) => {
		if(params.ec_id){
			this.child.getInfoById(params.ec_id,isCheck);
		}
		this.setState({
			showModal: true,
			modalText: params.ec_id ? (isCheck ? "查看分类" : "编辑分类") : "添加分类"
		});

	}


	closeModal(status) {
		this.setState({
			showModal: false
		})
		if(status){
			this.getDatas();
		}
	}

	render() {

		return (
			<div>
				<Button type="primary" className="primary-add" onClick={this.operationData} >添加</Button>
				<Table pagination={{
					pageSize: this.state.pageSize,
					current: this.state.current,
					total: this.state.total,
					onChange: this.onChange.bind(this),
					onShowSizeChange: this.onShowSizeChange.bind(this),
					showQuickJumper: true,
					showSizeChanger: true,
					pageSizeOptions: ['10', '15', '20', '25']
				}} columns={this.state.columns} rowKey={record => record.ec_id} loading={this.state.loading} dataSource={this.state.data} />

				{<BaseDataEdit visible={this.state.showModal} onRef={(ref)=>{ this.child = ref}} fromChild={(status) => {
					this.closeModal(status);
				}} modalText={this.state.modalText}  id={this.state.id}  />}
			</div>
		);
	}
}
