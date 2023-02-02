import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from '../../netWork'
import ExploreStyle from './Explore.module.scss'
import InfoCpn from '../../components/InfoCpn/InfoCpn';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';


export default function Explore () {
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(99)
    let [data, setData] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [info, setInfo] = useState({})

    // 过滤
    const [natural, setNatural] = useState([])
    const [city, setCity] = useState([])
    const [motion, setMotion] = useState([])
    const [character, setCharacter] = useState([])
    const [author, setAuthor] = useState([])


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios({
            url: "/picture/check",
            method: "get",
            params: {
                pageNum,
                pageSize
            }
        }).then(res => {
            if (res.code === 200) {
                setData(() => {
                    data = res.results
                    getNewData()
                    return data
                })
            }
        })
    }

    const getNewData = () => {
        let newnatural = data.filter(item => item.theme === '自然')
        setNatural(newnatural)
        let newcity = data.filter(item => item.theme === '城市')
        setCity(newcity)
        let newmotion = data.filter(item => item.theme === '运动')
        setMotion(newmotion)
        let newcharacter = data.filter(item => item.theme === '人物')
        setCharacter(newcharacter)
        let newauthor = data.filter(item => item.theme === '签约摄影师')
        setAuthor(newauthor)
    }

    const openInfo = (val) => {
        setInfo(val)
        setIsShow(true)
        stopMove()
    }

    const closeInfo = () => {
        setIsShow(false)
        Move()
    }

    const stopMove = () => {
        let m = function (e) { e.preventDefault(); };
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", m, { passive: false });//禁止页面滑动
    }
    //开启页面滚动
    const Move = () => {
        let m = function (e) { e.preventDefault(); };
        document.body.style.overflow = '';//出现滚动条
        document.removeEventListener("touchmove", m, { passive: true });
    }

    return (
        <div className={ExploreStyle.selectedwrap}>
            <InfoCpn isShow={isShow} info={info} closeInfo={closeInfo} />
            <Tabs
                centered
                defaultActiveKey="1"
                items={[
                    {
                        label: `全部`,
                        key: '1',
                        children: (
                            <div className={ExploreStyle.selected}>
                                <section className={ExploreStyle.itemwrap}>
                                    {data.map(item =>
                                        <div key={item.id} className={ExploreStyle.img}>
                                            <div>
                                                <img src={item.imgUrl} alt={item.name} />
                                            </div>
                                            <div className={ExploreStyle.mask} onClick={() => openInfo(item)}>
                                                <div className={ExploreStyle.info}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                    <div className={ExploreStyle.user}>
                                                        <div>
                                                            <img src={item.imgUrl} alt={item.author} />
                                                            <span>
                                                                {item.author}
                                                            </span>
                                                        </div>
                                                        <div className={ExploreStyle.hudong}>
                                                            <span>
                                                                <EyeOutlined />
                                                                {item.views}
                                                            </span>
                                                            <span>
                                                                <LikeOutlined />
                                                                {item.stars}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        )
                    },
                    {
                        label: `自然`,
                        key: '2',
                        children: (
                            <div className={ExploreStyle.selected}>
                                <section className={ExploreStyle.itemwrap}>
                                    {natural.map(item =>
                                        <div key={item.id} className={ExploreStyle.img}>
                                            <div>
                                                <img src={item.imgUrl} alt={item.name} />
                                            </div>
                                            <div className={ExploreStyle.mask} onClick={() => openInfo(item)}>
                                                <div className={ExploreStyle.info}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                    <div className={ExploreStyle.user}>
                                                        <div>
                                                            <img src={item.imgUrl} alt={item.author} />
                                                            <span>
                                                                {item.author}
                                                            </span>
                                                        </div>
                                                        <div className={ExploreStyle.hudong}>
                                                            <span>
                                                                <EyeOutlined />
                                                                {item.views}
                                                            </span>
                                                            <span>
                                                                <LikeOutlined />
                                                                {item.stars}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        )
                    },
                    {
                        label: `城市`,
                        key: '3',
                        children: (
                            <div className={ExploreStyle.selected}>
                                <section className={ExploreStyle.itemwrap}>
                                    {city.map(item =>
                                        <div key={item.id} className={ExploreStyle.img}>
                                            <div>
                                                <img src={item.imgUrl} alt={item.name} />
                                            </div>
                                            <div className={ExploreStyle.mask} onClick={() => openInfo(item)}>
                                                <div className={ExploreStyle.info}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                    <div className={ExploreStyle.user}>
                                                        <div>
                                                            <img src={item.imgUrl} alt={item.author} />
                                                            <span>
                                                                {item.author}
                                                            </span>
                                                        </div>
                                                        <div className={ExploreStyle.hudong}>
                                                            <span>
                                                                <EyeOutlined />
                                                                {item.views}
                                                            </span>
                                                            <span>
                                                                <LikeOutlined />
                                                                {item.stars}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        )
                    },
                    {
                        label: `运动`,
                        key: '4',
                        children: (
                            <div className={ExploreStyle.selected}>
                                <section className={ExploreStyle.itemwrap}>
                                    {motion.map(item =>
                                        <div key={item.id} className={ExploreStyle.img}>
                                            <div>
                                                <img src={item.imgUrl} alt={item.name} />
                                            </div>
                                            <div className={ExploreStyle.mask} onClick={() => openInfo(item)}>
                                                <div className={ExploreStyle.info}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                    <div className={ExploreStyle.user}>
                                                        <div>
                                                            <img src={item.imgUrl} alt={item.author} />
                                                            <span>
                                                                {item.author}
                                                            </span>
                                                        </div>
                                                        <div className={ExploreStyle.hudong}>
                                                            <span>
                                                                <EyeOutlined />
                                                                {item.views}
                                                            </span>
                                                            <span>
                                                                <LikeOutlined />
                                                                {item.stars}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        )
                    },
                    {
                        label: `人物`,
                        key: '5',
                        children: (
                            <div className={ExploreStyle.selected}>
                                <section className={ExploreStyle.itemwrap}>
                                    {character.map(item =>
                                        <div key={item.id} className={ExploreStyle.img}>
                                            <div>
                                                <img src={item.imgUrl} alt={item.name} />
                                            </div>
                                            <div className={ExploreStyle.mask} onClick={() => openInfo(item)}>
                                                <div className={ExploreStyle.info}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                    <div className={ExploreStyle.user}>
                                                        <div>
                                                            <img src={item.imgUrl} alt={item.author} />
                                                            <span>
                                                                {item.author}
                                                            </span>
                                                        </div>
                                                        <div className={ExploreStyle.hudong}>
                                                            <span>
                                                                <EyeOutlined />
                                                                {item.views}
                                                            </span>
                                                            <span>
                                                                <LikeOutlined />
                                                                {item.stars}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        )
                    },
                    {
                        label: `签约摄影师`,
                        key: '6',
                        children: (
                            <div className={ExploreStyle.selected}>
                                <section className={ExploreStyle.itemwrap}>
                                    {author.map(item =>
                                        <div key={item.id} className={ExploreStyle.img}>
                                            <div>
                                                <img src={item.imgUrl} alt={item.name} />
                                            </div>
                                            <div className={ExploreStyle.mask} onClick={() => openInfo(item)}>
                                                <div className={ExploreStyle.info}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                    <div className={ExploreStyle.user}>
                                                        <div>
                                                            <img src={item.imgUrl} alt={item.author} />
                                                            <span>
                                                                {item.author}
                                                            </span>
                                                        </div>
                                                        <div className={ExploreStyle.hudong}>
                                                            <span>
                                                                <EyeOutlined />
                                                                {item.views}
                                                            </span>
                                                            <span>
                                                                <LikeOutlined />
                                                                {item.stars}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        )
                    },
                ]}
            />
        </div>
    )
}
