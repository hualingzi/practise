import React, { useState, useEffect } from 'react'
import { Space, Table, Pagination, Button, Modal, Form, Input, message, Popconfirm, Select, InputNumber } from 'antd';
import axios from '../../netWork'
import PictureStyle from './Picture.module.scss'
import UploadCpn from '../../components/UploadCpn/UploadCpn'
const { Search } = Input;

export default function Picture () {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '图片名称',
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
            title: '题材',
            dataIndex: 'theme',
            key: 'theme',
        },
        {
            title: '设备',
            dataIndex: 'equipment',
            key: 'equipment',
        },
        {
            title: '风格',
            dataIndex: 'style',
            key: 'style',
        },
        {
            title: '地区',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: '摄影师',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '浏览量',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: '点赞量',
            dataIndex: 'stars',
            key: 'stars',
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
    const [pageSize, setPageSize] = useState(5)
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
    // 图片
    let [imgUrl, setImgUrl] = useState('')
    let [theme, setTheme] = useState([])
    let [equipment, setEquipment] = useState([])
    let [style, setStyle] = useState([])
    let [region, setRegion] = useState([])
    let [author, setAuthor] = useState([])

    useEffect(() => {
        getData()
        getThemeData()
        getEquipmentData()
        getStyleData()
        getRegion()
        getAuthor()
    }, [pageNum, name])

    // 获取数据
    const getData = () => {
        axios({
            url: "/picture/check",
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

    const getThemeData = () => {
        axios({
            url: "/theme/check",
            method: "get",
            params: {
                pageNum: 1,
                pageSize: 99,
            },
        }).then((res) => {
            if (res.code === 200) {
                setTheme(res.results)
            }
        });
    }

    const getEquipmentData = () => {
        axios({
            url: "/equipment/check",
            method: "get",
            params: {
                pageNum: 1,
                pageSize: 99,
            },
        }).then((res) => {
            if (res.code === 200) {
                setEquipment(res.results)
            }
        });
    }

    const getStyleData = () => {
        axios({
            url: "/style/check",
            method: "get",
            params: {
                pageNum: 1,
                pageSize: 99,
            },
        }).then((res) => {
            if (res.code === 200) {
                setStyle(res.results)
            }
        });
    }

    const getRegion = () => {
        axios({
            url: "/region/check",
            method: "get",
            params: {
                pageNum: 1,
                pageSize: 99,
            },
        }).then((res) => {
            if (res.code === 200) {
                setRegion(res.results)
            }
        });
    }

    const getAuthor = () => {
        axios({
            url: "/author/check",
            method: "get",
            params: {
                pageNum: 1,
                pageSize: 99,
            },
        }).then((res) => {
            if (res.code === 200) {
                setAuthor(res.results)
            }
        });
    }


    // 点击出现新增弹窗
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };
    // 新增确定
    const handleAddOk = () => {
        axios({
            url: '/picture/add',
            method: 'post',
            data: {
                imgUrl,
                ...addForm
            }
        }).then(res => {
            console.log(data);
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
    const getImgUrl = (val) => {
        setImgUrl(val)
    }

    // 点击出现修改弹窗
    const showEditModal = (val) => {
        setEditForm(val)
        setId(val.id)
        setImgUrl(val.imgUrl)
        setIsEditModalOpen(true);
    };
    // 修改确定
    const handleEditOk = () => {
        axios({
            url: '/picture/edit',
            method: 'put',
            data: {
                id,
                imgUrl,
                name: editForm.name,
                theme: editForm.theme,
                equipment: editForm.equipment,
                style: editForm.style,
                region: editForm.region,
                author: editForm.author,
                views: editForm.views,
                stars: editForm.stars
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
            url: '/picture/delete',
            method: 'delete',
            data: {
                id: val.id
            }
        }).then(res => {
            if (res.code === 200) {
                message.success('删除成功！');
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

    const handleChange = (value) => {
        // console.log(`selected ${value}`);
    };

    return (
        <div className={PictureStyle.table}>
            <div className={PictureStyle.operation}>
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
                        label="图片名称"
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
                    <Form.Item
                        label="题材"
                        name="theme"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={theme}
                            placeholder={'请选择题材'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="设备"
                        name="equipment"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={equipment}
                            placeholder={'请选择设备'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="风格"
                        name="style"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={style}
                            placeholder={'请选择风格'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="地区"
                        name="region"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={region}
                            placeholder={'请选择地区'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="摄影师"
                        name="author"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={author}
                            placeholder={'请选择摄影师'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="浏览量"
                        name="views"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="点赞"
                        name="stars"
                    >
                        <InputNumber />
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
                        label="图片名称"
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
                    <Form.Item
                        label="题材"
                        name="theme"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={theme}
                            placeholder={'请选择题材'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="设备"
                        name="equipment"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={equipment}
                            placeholder={'请选择设备'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="风格"
                        name="style"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={style}
                            placeholder={'请选择风格'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="地区"
                        name="region"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={region}
                            placeholder={'请选择地区'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="摄影师"
                        name="author"
                    >
                        <Select
                            showSearch
                            onChange={handleChange}
                            fieldNames={
                                {
                                    label: 'name',
                                    value: 'name',
                                }
                            }
                            options={author}
                            placeholder={'请选择摄影师'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="浏览量"
                        name="views"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="点赞量"
                        name="stars"
                    >
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                rowKey={(row) => row.id}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className={PictureStyle.page}>
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
