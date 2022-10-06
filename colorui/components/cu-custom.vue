<template>
    <view>
        <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
            <view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
                <view class="action" @tap="BackPage">
                    <slot name="backText">
                        <text class="cuIcon-back" v-if="isBack"></text>
                        <text class="cuIcon-home" v-else @click="handleHome"></text>
                    </slot>
                </view>
                <view class="content" :style="[{top:StatusBar + 'px'}]">
                    <slot name="content">
                        <text>测试-蛋糕店</text>
                    </slot>
                </view>
                <slot name="right">
                    <!-- #ifdef APP-PLUS||H5 -->
                    <view class="action text-grey">
                        <text class="cuIcon-search"></text>
                        <u-line direction="col" length="15" margin="20upx"></u-line>
                        <text class="cuIcon-sort" @click="show=true"></text>
                    </view>
                    <!-- #endif -->
                </slot>
            </view>
        </view>
        <u-overlay :show="show" @click="show = false">
            <view class="bg-fff pop-tab">
                <view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
                    <view class="action" @tap="BackPage">
                        <slot name="backText">
                            <text class="cuIcon-back" v-if="isBack"></text>
                            <text class="cuIcon-home" v-else @click="handleHome"></text>
                        </slot>
                    </view>
                    <view class="content" :style="[{top:StatusBar + 'px'}]">
                        <slot name="content">
                            <text>蛋糕店</text>
                        </slot>
                    </view>
                    <slot name="right">
                        <view class="action text-grey">
                            <text class="cuIcon-search"></text>
                            <u-line direction="col" length="15" margin="20upx"></u-line>
                            <text class="cuIcon-sort"></text>
                        </view>
                    </slot>
                </view>
                <view class="padding-tb flex justify-around" @click.stop>
                    <view v-for="(listItem,listIndex) in list" :key="listIndex" class="text-center padding solid-right"
                        :style="tabStyle" @click="handleJump(listItem.target)">
                        <text class="iconfont" :class="listItem.name"></text>
                        <view class="grid-text margin-top-xs">{{listItem.title}}</view>
                    </view>
                </view>
            </view>
        </u-overlay>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
                show: false,
                list: [{
                        name: 'icon-huodong',
                        title: '最新活动',
                        target: ''
                    },
                    {
                        name: 'icon-gerenzhongxin',
                        title: '个人中心',
                        target: '/sub_pages/my/my'
                    },
                    {
                        name: 'icon-cake',
                        title: '关于我们',
                        target: ''
                    },
                    {
                        name: 'icon-dingwei',
                        title: '配送范围',
                        target: ''
                    }
                ],
            };
        },
        name: 'cu-custom',
        computed: {
            style() {
                var StatusBar = this.StatusBar;
                var CustomBar = this.CustomBar;
                var bgImage = this.bgImage;
                var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
                if (this.bgImage) {
                    style = `${style}background-image:url(${bgImage});`;
                }
                return style
            },
            tabStyle() {
                var StatusBar = this.StatusBar;
                var CustomBar = this.CustomBar;
                let h = StatusBar + CustomBar
                console.log(h);
                let style = `margin-top:${h}px`
                return style
            }
        },
        props: {
            bgColor: {
                type: String,
                default: '#ffffff'
            },
            isBack: {
                type: [Boolean, String],
                default: false
            },
            bgImage: {
                type: String,
                default: ''
            },
        },
        methods: {
            BackPage() {
                uni.navigateBack({
                    delta: 1
                });
            },
            handleHome() {
                uni.navigateTo({
                    url: 'pages/home/home'
                })
            },
            handleJump(url) {
                uni.navigateTo({
                    url
                })
                this.show = false
            }
        }
    }
</script>

<style>
    .cu-bar.fixed {
        z-index: 100;
        background-color: #fff !important;
    }

    .solid-right:last-of-type::after {
        border-right: none !important;
    }
</style>
