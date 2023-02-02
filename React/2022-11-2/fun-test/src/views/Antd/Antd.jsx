import React, { useState, useEffect } from 'react'
import { Space, Table, Pagination, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import axios from '../../netWork'
import UploadCpn from '../../components/UploadCpn/UploadCpn'
const { Search } = Input;
export default function Antd () {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '类型名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '图片',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (imgUrl) => <img src={imgUrl} alt="" style={{ width: '40px', height: '40px' }} />,
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
    const [data, setDate] = useState([])
    const [name, setName] = useState('')
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(3)
    const [total, setTotal] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    let [addForm, setAddForm] = useState({})
    let [editForm, setEditForm] = useState({})
    let [imgUrl, setImgUrl] = useState('')
    let [id, setId] = useState()
    useEffect(() => {
        getData()
    }, [pageNum, name])

    const getData = () => {
        axios({
            url: "/type/check",
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
                console.log(res)
            }
        })
    }

    const changePage = (page) => {
        setPageNum(page)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        axios({
            url: '/type/add',
            method: 'post',
            data: {
                imgUrl,
                ...addForm
            }
        }).then(res => {
            if (res.code === 200) {
                message.success('新增成功！')
                getData();
                setIsModalOpen(false);
                setPageNum(Math.floor(total / pageSize) + 1)
            }
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onValuesChange = (changedValues, allValues) => {
        setAddForm(allValues)
    }

    const getImgUrl = (val) => {
        setImgUrl(val)
    }

    const confirm = (val) => {
        axios({
            url: '/type/delete',
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

    const showEditModal = (val) => {
        setEditForm(val)
        setId(val.id)
        setImgUrl(val.imgUrl)
        setIsEditModalOpen(true);
    };

    const handleEditOk = () => {
        axios({
            url: '/type/edit',
            method: 'put',
            data: {
                id,
                imgUrl,
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

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };

    const onEditValuesChange = (changedValues, allValues) => {
        setEditForm(allValues)

    }

    const onSearch = (val) => {
        setPageNum(1)
        setName(val)
        getData()
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>新增</Button>
            <Search style={{ width: '300px' }}
                placeholder="搜索"
                onSearch={onSearch}
                enterButton
                allowClear={true}
            />
            <Modal title="新增"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        label="类型名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="图片"
                        name="info"
                    >
                        <UploadCpn getImgUrl={getImgUrl} />
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
                        label="类型名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="图片"
                        name="imgUrl"
                    >
                        <UploadCpn getImgUrl={getImgUrl} imgUrl={imgUrl} />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                rowKey={(row) => row.id}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <Pagination
                current={pageNum}
                defaultCurrent={pageNum}
                defaultPageSize={pageSize}
                total={total}
                onChange={changePage}
            />
        </div>
    )
}
