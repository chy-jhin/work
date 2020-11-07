<template>
	<div>
		<el-dialog
			title="查看订单"
			:visible="show === $options.name"
			:close-on-click-modal="false"
			append-to-body
			@close="close"
			@closed="closed"
			width="840px"
		>
			<el-form class="form-box" size="mini" label-width="80px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="订单编号"><el-input :disabled="isdisabled" v-model="form.id" placeholder="请输入订单编号" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="交易金额" label-width="80px"><el-input :disabled="isdisabled" v-model="form.total_amount" placeholder="订单交易金额" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="收货人"><el-input :disabled="isdisabled" v-model="form.consignee" placeholder="收货人" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="收货电话" label-width="80px"><el-input :disabled="isdisabled" v-model="form.mobile" placeholder="收货人电话" clearable></el-input></el-form-item>
					</el-col>

         			<el-col :span="12">
						<el-form-item label="收货地址"><el-input :disabled="isdisabled" v-model="form.address" placeholder="收货地址" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="详细地址"><el-input :disabled="isdisabled" v-model="form.addr" placeholder="详细地址" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.pay_time">sn
						<el-form-item label="付款时间"><el-input :disabled="isdisabled" v-model="form.pay_time" placeholder="付款时间" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.shipping_name">
						<el-form-item label="物流公司"><el-input :disabled="isdisabled" v-model="form.shipping_name" placeholder="物流公司" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.shipping_sn">
						<el-form-item label="物流单号"><el-input :disabled="isdisabled" v-model="form.shipping_sn" placeholder="物流单号" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.shipping_time">
						<el-form-item label="发货时间"><el-input :disabled="isdisabled" v-model="form.shipping_time" placeholder="发货时间" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.confirm_time">
						<el-form-item label="确认收货时间"><el-input :disabled="isdisabled" v-model="form.confirm_time" placeholder="确认收货时间" clearable></el-input></el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="订单留言"><el-input :disabled="isdisabled" v-model="form.user_note" placeholder="订单留言" clearable></el-input></el-form-item>
					</el-col>





					<!-- <el-col :span="12">
						<el-form-item label="资源类型">
							<el-select size="small" style="width:120px;" v-model="form.type" @change="typeChange" placeholder="请选择状态">
								<el-option v-for="item in typeList" :key="item.k" :label="item.v" :value="item.k"></el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" @click="close">取 消</el-button>
				<el-button size="medium" type="primary" @click="close">确 定</el-button>
			</div>
			<el-image-viewer v-if="viewIndex >= 0" :on-close="viewIndexClose" :url-list="this.form.path" :initialIndex="viewIndex"></el-image-viewer>
		</el-dialog>
	</div>
</template>
<script>
import {API_URL,orderInfo} from '@/request/api.js';

import ElImageViewer from 'element-ui/packages/image/src/image-viewer';

export default {
	name: 'orderedit',
	components: {
		ElImageViewer
	},
	props: {
		value: {
			type: Object
		},
		show: {
			type: String
		}
	},
	computed: {
		showvideo() {
			if (this.form.type != 1 && this.form.path != '') return true;
			return false;
		}
	},
	watch: {
		show(val) {
			if (val === this.$options.name) {
				this.$ObjectMixed(this.form, this.value.form);
				this.uploadData.token = this.$store.getters.getToken;
				this.uploadcover.token = this.$store.getters.getToken;
			}
		}
	},
	data() {
		return {
			isdisabled: true,
			viewIndex: -1,
			uploadcover: {
				url: API_URL + 'admin/upload',
				token: ''
			},
			uploadData: {
				url: API_URL + 'admin/resources/uploadResource',
				token: '',
				type: ''
			},
			form: {
				token: '',
				id: '',
				mobile: '',
				consignee: '',
				create_time: '',
				status: 1,
				address: '',
				user_id: '',
				addr: '',
				total_amount:"",
				sort: '0'
			}
		};
	},
	methods: {
		viewIndexClose() {
			this.viewIndex = -1;
		},
		handlePreview(file) {
			console.log('上传文件');
		},

		removeImages(i) {
			this.$confirm('确定删除此图片吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.form.path.splice(i, 1);
				})
				.catch(() => {});
		},

		submit() {
			orderInfo(this.form).then(res => {
				this.$message.success({
					message: res.msg || '操作成功'
				});
				this.$emit('visibleChange', { getList: true, show: '' });
			});
		},
		close() {
			this.$emit('visibleChange', { getList: false, show: '' });
		},
		closed() {
			Object.assign(this.$data, this.$options.data());
		},
		uploadCover(res) {
			this.form.cover = res.data;
			console.log(this.form);
		},
	}
};
</script>
<style lang="less" scoped>
.image-box {
	width: 80px;
	height: 80px;
	border: 1px solid #eee;
	border-radius: 4px;
	margin-right: 10px;
}
.upload-box {
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		border: 1px dashed #d9d9d9;
		border-radius: 4px;
	}
	.avatar {
		width: 100px;
		height: 125px;
	}
}
.upload-images-box {
	& /deep/ .el-upload-list__item {
		width: 80px;
		height: 80px;
	}
	& /deep/ .el-upload--picture-card {
		width: 80px;
		height: 80px;
		line-height: 80px;
	}
}
</style>
