import React, { useState, useEffect } from 'react'
import axios from '../../netWork'
import ThemeStyle from './Theme.module.scss';
import { Space, Table, Pagination, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
const { Search } = Input;

export default function Theme () {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '题材名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showEditModal(record)}>编辑</a>
                    <Popconfirm
                        title="你确定要删除该数据吗？"
                        onConfirm={() => confirm(record)}
                        onCancel={() => cancel()}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // 表格的数据
    const [data, setDate] = useState([])
    // 页数
    const [pageNum, setPageNum] = useState(1)
    // 条数
    const [pageSize, setPageSize] = useState(7)
    const [total, setTotal] = useState(0)

    // 新增的值
    let [addForm, setAddForm] = useState({})
    // 新增弹窗控制
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // 修改的值
    let [editForm, setEditForm] = useState({})
    let [id, setId] = useState()
    // 修改弹窗控制
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // 搜索的名称
    const [name, setName] = useState('')


    useEffect(() => {
        getData()
    }, [pageNum, name])

    // 获取数据
    const getData = () => {
        axios({
            url: "/theme/check",
            method: "get",
            params: {
                name,
                pageNum,
                pageSize
            }
        }).then(res => {
            if (res.code === 200) {
                setDate(res.results)
                setTotal(res.total)
            }
        })
    }

    // 点击出现新增弹窗
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };
    // 新增确定
    const handleAddOk = () => {
        axios({
            url: '/theme/add',
            method: 'post',
            data: {
                ...addForm
            }
        }).then(res => {
            if (res.code === 200) {
                message.success('新增成功！')
                getData();
                setIsAddModalOpen(false);
                setPageNum(Math.floor(total / pageSize) + 1)
            }
        })
    }
    // 新增取消
    const handleAddCancel = () => {
        setIsAddModalOpen(false);
    };
    // 新增的值
    const onAddValuesChange = (changedValues, allValues) => {
        setAddForm(allValues)
    }

    // 点击出现修改弹窗
    const showEditModal = (val) => {
        setEditForm(val)
        setId(val.id)
        setIsEditModalOpen(true);
    };
    // 修改确定
    const handleEditOk = () => {
        axios({
            url: '/theme/edit',
            method: 'put',
            data: {
                id,
                name: editForm.name
            }
        }).then(res => {
            if (res.code === 200) {
                message.success('编辑成功！')
                getData()
                setIsEditModalOpen(false);
            }
        })
    };
    // 修改取消
    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };
    // 修改的值
    const onEditValuesChange = (changedValues, allValues) => {
        setEditForm(allValues)
    }

    // 点击删除
    const confirm = (val) => {
        axios({
            url: '/theme/delete',
            method: 'delete',
            data: {
                id: val.id
            }
        }).then(res => {
            if (res.code === 200) {
                message.success('删除成功！');
                setPageSize(1)
                getData()
                setPageNum(Math.floor(total / pageSize))
            }
        })
    }
    const cancel = () => {
        message.error('取消删除！');
    }

    // 搜索
    const onSearch = (val) => {
        setPageNum(1)
        setName(val)
        getData()
    }
    // 翻页
    const changePage = (page) => {
        setPageNum(page)
    }


    return (
        <div className={ThemeStyle.table}>
            <div className={ThemeStyle.operation}>
                <Button type="primary" onClick={showAddModal}>新增</Button>
                <Search style={{ width: '300px' }}
                    placeholder="搜索"
                    onSearch={onSearch}
                    enterButton
                    allowClear={true}
                />
            </div>
            <Modal title="新增"
                open={isAddModalOpen}
                onOk={handleAddOk}
                onCancel={handleAddCancel}
                destroyOnClose={true}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    onValuesChange={onAddValuesChange}
                >
                    <Form.Item
                        label="题材名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="修改"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                destroyOnClose={true}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    initialValues={editForm}
                    onValuesChange={onEditValuesChange}
                >
                    <Form.Item
                        label="题材名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                rowKey={(row) => row.id}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className={ThemeStyle.page}>
                <Pagination
                    current={pageNum}
                    defaultCurrent={pageNum}
                    defaultPageSize={pageSize}
                    total={total}
                    onChange={changePage}
                />
            </div>
        </div>
    )
}
