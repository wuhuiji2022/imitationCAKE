<template>
    <view>
        <cu-custom></cu-custom>
        <!-- 数据为空 -->
        <u-empty v-if="isEmpty" icon="https://cdn.uviewui.com/uview/empty/data.png"></u-empty>
        <!-- 数据列表 -->
        <view class="cont">
            <good-item v-for="(item,index) in glist" :gdata="item"></good-item>
        </view>
        <view class="my-fixed flex justify-center bg-fff padding-sm">
            <view v-for="(item,index) in tabArr" :key="index" @click="handleTab(item)"
                class="flex justify-around align-center padding-tb-sm">
                <view class="">{{item.name}}</view>
                <view class="padding-lr" v-if="index<tabArr.length-1">
                    <u-line direction="col" length="15"></u-line>
                </view>
            </view>
        </view>
        <u-popup :show="show" mode="left" @close="handleClose">
            <view class="pop-cont">
                <view v-for="(item,index) in cfylist">
                    <view class="padding-sm u-border-bottom">
                        {{item.bname}}
                        <view class="cu-tag round bg-yellow color-fff margin-left-xs">
                            {{item.num}}
                        </view>
                    </view>
                    <view v-if="index==0">
                        <view @tap="listShow=!listShow" class="padding-sm" :class="{'u-border-bottom':!listShow}">
                            口味筛选
                        </view>
                        <u-cell-group v-if="listShow">
                            <u-cell v-for="(itm,idx) in item.list" :title="itm.tname" :name="itm.tname" isLink
                                @click="handleList(itm,1)"></u-cell>
                        </u-cell-group>
                        <view @click="sceneShow=!sceneShow" class="padding-sm" :class="{'u-border-bottom':!sceneShow}">
                            场景筛选
                        </view>
                        <u-cell-group v-if="sceneShow">
                            <u-cell v-for="(itm,idx) in item.scene" :title="itm.tname" isLink
                                @click="handleList(itm,2)"></u-cell>
                        </u-cell-group>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                glist: [],
                page: 0,
                tabArr: [{
                        name: '分类',
                        bcid: '',
                        target: ''
                    },
                    {
                        name: '蛋糕',
                        bcid: '1',
                        target: 'sub_pages/cake/cake'
                    },
                    {
                        name: '面包',
                        bcid: '11',
                        target: 'sub_pages/cake/cake'
                    },
                    {
                        name: '小食',
                        bcid: '6',
                        target: 'sub_pages/cake/cake'
                    },
                    {
                        name: '购物车',
                        bcid: '',
                        target: '/sub_pages/cart/cart'
                    },
                ],
                // bcid:1,
                // condition:{ //商品列表查询条件对象
                // 	bcid:1
                // },
                show: false,
                cfylist: [],
                listShow: false,
                sceneShow: false,
                isEmpty: false
            }
        },
        computed: {
            num() {
                return this.$store.state.count.num
            },
            condition() {
                return this.$store.state.condition.cond
            }
        },
        onLoad() {
            this.loadData()

            this.$get('/1.1/classes/classify').then(res => {
                console.log(res);
                this.cfylist = res.results
            })
        },
        onReachBottom() {
            this.loadData()
        },
        onPullDownRefresh() {
            this.glist = []
            this.page = 0
            this.loadData()
        },
        methods: {
            handleDetail(idx) {
                console.log(idx);
                uni.navigateTo({
                    url: '../detail/detail?idx=' + idx
                })
            },
            loadData() {
                let skip = this.page * 8
                let wh = JSON.stringify(this.condition)
                console.log(wh);
                let url = `/1.1/classes/goods?where=${wh}&limit=8&skip=${skip}`
                this.$get(url).then(res => {
                    uni.stopPullDownRefresh()
                    let {
                        results
                    } = res
                    if (results.length) {
                        this.page++
                        this.glist = [
                            ...this.glist,
                            ...res.results
                        ]
                    } else {
                        uni.showToast({
                            title: '这回真没了',
                            icon: 'none'
                        })
                    }
                    this.isEmpty = !this.glist.length

                })
            },
            reloadData() { //刷新页面数据
                this.glist = []
                this.page = 0
                this.loadData()
            },
            handleTab(item) {
                let {
                    bcid,
                    target
                } = item
                // console.log(typeof bcid);
                if (bcid) { //商品列表数据更新
                    // this.condition.bcid = Number(bcid)
                    this.$store.commit('changeCondition', {
                        bcid: Number(bcid)
                    })
                    this.reloadData()
                }
                if (!bcid && !target) { //侧边分类
                    this.show = true
                }
                if (!bcid && target) {
                    uni.navigateTo({
                        url: target
                    })
                }
            },
            handleClose() {
                this.show = false
            },
            handleList({
                bid,
                tid
            }, type) { //口味、场景筛选
                // console.log(typeof bid);
                // console.log(typeof tid);
                let obj = {
                    bcid: bid
                }
                type === 1 ? obj.fid = tid : obj.sid = tid
                this.$store.commit('changeCondition', obj)
                this.reloadData()
                this.show = false
            }
        }
    }
</script>

<style lang="scss">
    page {
        padding-bottom: 120upx;
    }

    .cont {
        display: flex;
        flex-wrap: wrap;
        padding: 15upx;
        justify-content: space-between;
    }

    .cake-item {
        width: 350upx;

        .poster {
            height: 350upx;
            background-color: #f5f5f5;
        }

        .fs-28 {
            margin-top: 24upx;
        }

        .fs-16 {
            margin: 14upx 0;
        }

        .fs-18 {
            margin-bottom: 22upx;
        }
    }

    .my-fixed {
        position: fixed !important;
        bottom: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 0 10upx 2upx rgba(0, 0, 0, 0.2);
    }

    .pop-cont {
        width: 400upx;
        margin-top: 200upx;
    }
</style>
