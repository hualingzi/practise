import React, { useState, useEffect } from 'react'
import { Carousel, Tabs } from 'antd';
import axios from '../../netWork'
import HomeStyle from './Home.module.scss'
import InfoCpn from '../../components/InfoCpn/InfoCpn';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';

export default function Home () {

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
                pageNum: 1,
                pageSize: 99
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
        <div className={HomeStyle.maxbox}>
            <InfoCpn isShow={isShow} info={info} closeInfo={closeInfo} />
            <div className={HomeStyle.carousel}>
                <Carousel autoplay >
                    <div>
                        <img src={require('../../img/index/page1.jpg')} />
                    </div>
                    <div>
                        <img src={require('../../img/index/page2.jpg')} alt="" />
                    </div>
                    <div>
                        <img src={require('../../img/index/page3.jpg')} alt="" />
                    </div>
                    <div>
                        <img src={require('../../img/index/page4.jpg')} alt="" />
                    </div>
                    <div>
                        <img src={require('../../img/index/page5.jpg')} alt="" />
                    </div>
                    <div>
                        <img src={require('../../img/index/page6.jpg')} alt="" />
                    </div>
                </Carousel>
            </div>
            <div className={HomeStyle.hotwrap}>
                <div className={HomeStyle.title}>
                    <h1>热门航拍点</h1>
                    <a href="">热门航拍点集锦</a>
                </div>
                <div className={HomeStyle.hot}>
                    <div>
                        <div className={HomeStyle.img}>
                            <img src={require('../../img/index/Australia.jpg')} alt="" />
                        </div>
                        <div>
                            <span>澳大利亚</span>
                        </div>
                    </div>
                    <div>
                        <div className={HomeStyle.img}>
                            <img src={require('../../img/index/America.jpg')} alt="" />
                        </div>
                        <div>
                            <span>美国</span>
                        </div>
                    </div>
                    <div>
                        <div className={HomeStyle.img}>
                            <img src={require('../../img/index/Iceland.jpg')} alt="" />
                        </div>
                        <div>
                            <span>冰岛</span>
                        </div>
                    </div>
                    <div>
                        <div className={HomeStyle.img}>
                            <img src={require('../../img/index/Tibet.jpg')} alt="" />
                        </div>
                        <div>
                            <span>西藏</span>
                        </div>
                    </div>
                    <div>
                        <div className={HomeStyle.img}>
                            <img src={require('../../img/index/Shanghai.jpg')} alt="" />
                        </div>
                        <div>
                            <span>上海</span>
                        </div>
                    </div>
                    <div>
                        <div className={HomeStyle.img}>
                            <img src={require('../../img/index/Xinjiang.jpg')} alt="" />
                        </div>
                        <div>
                            <span>新疆</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={HomeStyle.selectedwrap}>
                <Tabs
                    centered
                    items={[
                        {
                            label: `精选`,
                            key: '1',
                            children: (
                                <div className={HomeStyle.selected}>
                                    <div className={HomeStyle.itemwrap}>
                                        <div className={HomeStyle.item}>
                                            <div className={HomeStyle.itemtitle}>
                                                <h1>自然</h1>
                                                <a href="">更多</a>
                                            </div>
                                            <div className={HomeStyle.slide}>
                                                {natural.map(item =>
                                                    <div className={HomeStyle.slideitem} key={item.id}>
                                                        <div className={HomeStyle.slideimg} onClick={() => openInfo(item)}>
                                                            <img src={item.imgUrl} alt={item.name} />
                                                        </div>
                                                        <div className={HomeStyle.slidetext}>
                                                            <div className={HomeStyle.slideinfo}>
                                                                <a href=''>{item.name}</a>
                                                                <p>
                                                                    <span>设备:</span>
                                                                    <a href="">{item.equipment}</a>
                                                                </p>
                                                                <p>
                                                                    <span className={HomeStyle.look}>
                                                                        <EyeOutlined />
                                                                        {item.views}
                                                                    </span>
                                                                    <span>
                                                                        <LikeOutlined />
                                                                        {item.stars}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className={HomeStyle.slideuser}>
                                                                <a href="">
                                                                    <img src={item.imgUrl} alt={item.author} />
                                                                    <span>
                                                                        {item.author}
                                                                    </span>
                                                                </a>
                                                                <span>
                                                                    2022年11月03日
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={HomeStyle.item}>
                                            <div className={HomeStyle.itemtitle}>
                                                <h1>城市</h1>
                                                <a href="">更多</a>
                                            </div>
                                            <div className={HomeStyle.slide}>
                                                {city.map(item =>
                                                    <div className={HomeStyle.slideitem} key={item.id}>
                                                        <div className={HomeStyle.slideimg} onClick={() => openInfo(item)}>
                                                            <img src={item.imgUrl} alt={item.name} />
                                                        </div>
                                                        <div className={HomeStyle.slidetext}>
                                                            <div className={HomeStyle.slideinfo}>
                                                                <a href=''>{item.name}</a>
                                                                <p>
                                                                    <span>设备:</span>
                                                                    <a href="">{item.equipment}</a>
                                                                </p>
                                                                <p>
                                                                    <span className={HomeStyle.look}>
                                                                        <EyeOutlined />
                                                                        {item.views}
                                                                    </span>
                                                                    <span>
                                                                        <LikeOutlined />
                                                                        {item.stars}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className={HomeStyle.slideuser}>
                                                                <a href="">
                                                                    <img src={item.imgUrl} alt={item.author} />
                                                                    <span>
                                                                        {item.author}
                                                                    </span>
                                                                </a>
                                                                <span>
                                                                    2022年11月03日
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                        <div className={HomeStyle.item}>
                                            <div className={HomeStyle.itemtitle}>
                                                <h1>运动</h1>
                                                <a href="">更多</a>
                                            </div>
                                            <div className={HomeStyle.slide}>
                                                {motion.map(item =>
                                                    <div className={HomeStyle.slideitem} key={item.id}>
                                                        <div className={HomeStyle.slideimg} onClick={() => openInfo(item)}>
                                                            <img src={item.imgUrl} alt={item.name} />
                                                        </div>
                                                        <div className={HomeStyle.slidetext}>
                                                            <div className={HomeStyle.slideinfo}>
                                                                <a href=''>{item.name}</a>
                                                                <p>
                                                                    <span>设备:</span>
                                                                    <a href="">{item.equipment}</a>
                                                                </p>
                                                                <p>
                                                                    <span className={HomeStyle.look}>
                                                                        <EyeOutlined />
                                                                        {item.views}
                                                                    </span>
                                                                    <span>
                                                                        <LikeOutlined />
                                                                        {item.stars}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className={HomeStyle.slideuser}>
                                                                <a href="">
                                                                    <img src={item.imgUrl} alt={item.author} />
                                                                    <span>
                                                                        {item.author}
                                                                    </span>
                                                                </a>
                                                                <span>
                                                                    2022年11月03日
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={HomeStyle.item}>
                                            <div className={HomeStyle.itemtitle}>
                                                <h1>人物</h1>
                                                <a href="">更多</a>
                                            </div>
                                            <div className={HomeStyle.slide}>
                                                {character.map(item =>
                                                    <div className={HomeStyle.slideitem} key={item.id}>
                                                        <div className={HomeStyle.slideimg} onClick={() => openInfo(item)}>
                                                            <img src={item.imgUrl} alt={item.name} />
                                                        </div>
                                                        <div className={HomeStyle.slidetext}>
                                                            <div className={HomeStyle.slideinfo}>
                                                                <a href=''>{item.name}</a>
                                                                <p>
                                                                    <span>设备:</span>
                                                                    <a href="">{item.equipment}</a>
                                                                </p>
                                                                <p>
                                                                    <span className={HomeStyle.look}>
                                                                        <EyeOutlined />
                                                                        {item.views}
                                                                    </span>
                                                                    <span>
                                                                        <LikeOutlined />
                                                                        {item.stars}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className={HomeStyle.slideuser}>
                                                                <a href="">
                                                                    <img src={item.imgUrl} alt={item.author} />
                                                                    <span>
                                                                        {item.author}
                                                                    </span>
                                                                </a>
                                                                <span>
                                                                    2022年11月03日
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={HomeStyle.item}>
                                            <div className={HomeStyle.itemtitle}>
                                                <h1>签约摄影师</h1>
                                                <a href="">更多</a>
                                            </div>
                                            <div className={HomeStyle.slide}>
                                                {author.map(item =>
                                                    <div className={HomeStyle.slideitem} key={item.id}>
                                                        <div className={HomeStyle.slideimg} onClick={() => openInfo(item)}>
                                                            <img src={item.imgUrl} alt={item.name} />
                                                        </div>
                                                        <div className={HomeStyle.slidetext}>
                                                            <div className={HomeStyle.slideinfo}>
                                                                <a href=''>{item.name}</a>
                                                                <p>
                                                                    <span>设备:</span>
                                                                    <a href="">{item.equipment}</a>
                                                                </p>
                                                                <p>
                                                                    <span className={HomeStyle.look}>
                                                                        <EyeOutlined />
                                                                        {item.views}
                                                                    </span>
                                                                    <span>
                                                                        <LikeOutlined />
                                                                        {item.stars}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className={HomeStyle.slideuser}>
                                                                <a href="">
                                                                    <img src={item.imgUrl} alt={item.author} />
                                                                    <span>
                                                                        {item.author}
                                                                    </span>
                                                                </a>
                                                                <span>
                                                                    2022年11月03日
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    )
}