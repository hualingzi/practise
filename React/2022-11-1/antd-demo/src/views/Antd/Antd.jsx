import React, { Component } from 'react'
import { Space, Table, Pagination, Input, message, Popconfirm, Modal, Form, DatePicker } from 'antd';
import axios from '../../netWork'
import moment from 'moment';
const { Search } = Input;
const { TextArea } = Input;

export default class Antd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '详情',
                    dataIndex: 'info',
                    key: 'info',
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                    key: 'time',
                },
                {
                    title: '作者',
                    key: 'author',
                    dataIndex: 'author',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (_, record) => (
                        <Space size="middle">
                            <a onClick={() => this.edit(record)}>编辑</a>
                            <Popconfirm
                                title="你确定要删除该数据吗？"
                                onConfirm={() => this.confirm(record)}
                                onCancel={() => this.cancel()}
                                okText="确定"
                                cancelText="取消"
                            >
                                <a href="#">删除</a>
                            </Popconfirm>
                        </Space>
                    ),
                },
            ],
            data: [],
            pageNum: 1,
            pageSize: 3,
            total: 0,
            title: '',
            isModalOpen: false,
            editData: {
                time: undefined
            },
        }
    }

    componentDidMount () {
        this.getData()
    }
    getData = () => {
        axios({
            url: "/news/check",
            method: "get",
            params: {
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize,
                title: this.state.title
            }
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    data: res.results,
                    total: res.total
                })
                console.log(res)
            }
        })
    }
    changePage = (page) => {
        this.setState({
            pageNum: page
        }, () => {
            this.getData()
        })
    }
    onSearch = (val) => {
        this.setState({
            pageNum: 1,
            title: val
        }, () => {
            this.getData()
        })
    }
    confirm = (val) => {
        axios({
            url: '/news/delete',
            method: 'delete',
            data: {
                id: val.id
            }
        }).then(res => {
            if (res.code === 200) {
                message.success('删除成功！');
                this.setState({
                    pageNum: 1,
                }, () => {
                    this.getData()
                })
            }
        })
    }
    cancel = () => {
        message.error('取消删除！');
    }
    edit = (val) => {
        this.setState({
            editData: val,
            isModalOpen: true
        })
        // console.log(val);
    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    handleOk = () => {
        axios({
            url: '/news/edit',
            method: 'put',
            data: this.state.editData
        }).then(res => {
            if (res.code === 200) {
                message.success('编辑成功！')
                this.getData()
                this.setState({
                    isModalOpen: false
                })
            }
        })
    }
    handleCancel = () => {
        this.setState({
            isModalOpen: false
        })
    }
    onValuesChange = (changedValues, allValues) => {
        this.setState({
            editData: {
                id: this.state.editData.id,
                ...allValues
            }
        })
    }
    render () {
        let { columns, data, total, pageNum, pageSize, isModalOpen, editData } = this.state
        return (
            <div>
                <Search style={{ width: '300px' }} placeholder="搜索" onSearch={this.onSearch} enterButton allowClear={true} />
                <Table rowKey={(row) => row.id} columns={columns} dataSource={data} pagination={false} />
                <Pagination
                    current={pageNum}
                    defaultCurrent={pageNum}
                    defaultPageSize={pageSize}
                    total={total}
                    onChange={this.changePage}
                />
                <Modal title="编辑" open={isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel} destroyOnClose={true}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8
                        }}
                        wrapperCol={{
                            span: 16
                        }}
                        initialValues={editData}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        onValuesChange={this.onValuesChange}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="标题"
                            name="title"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="详情"
                            name="info"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="时间"
                            name="time"
                        >
                            <DatePicker
                                onChange={this.onChange}
                                placeholder="选择日期"
                                value={
                                    editData.time = moment(editData.time, 'YYYY-MM-DD')
                                }
                                format='YYYY-MM-DD'
                            />
                        </Form.Item>
                        <Form.Item
                            label="作者"
                            name="author"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
