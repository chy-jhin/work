<template>
	<div>
		<el-dialog
			title="查看订单"
			:visible="show === $options.name"
			:close-on-click-modal="false"
			append-to-body
			@close="close"
			@closed="closed"
			width="540px"
		>
			<el-form class="form-box" size="mini" label-width="80px">
				<el-row>
					<el-col :span="18">
						<el-form-item label="物流公司">
							<!-- <el-input  v-model="form.shipping_name" placeholder="请输入物流公司" clearable></el-input> -->
							            <el-select
              size="small"
              style="margin-right:15px;width:250px;"
              clearable
              v-model="form.post_id"
              placeholder="请选择物流公司"
            >
              <el-option
                v-for="(item,index) in PostName"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
							</el-form-item>
						
					</el-col>
				</el-row>
                <el-row>
					<el-col :span="18">
						<el-form-item label="物流单号" label-width="80px"><el-input v-model="form.post_no" placeholder="请输入物流单号" clearable></el-input></el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" @click="close">取 消</el-button>
				<el-button size="medium" type="primary" @click="submit">确 定</el-button>
			</div>
			<el-image-viewer v-if="viewIndex >= 0" :on-close="viewIndexClose" :url-list="this.form.path" :initialIndex="viewIndex"></el-image-viewer>
		</el-dialog>
	</div>
</template>
<script>
import {API_URL,goodsDeliver} from '@/request/api.js';

import ElImageViewer from 'element-ui/packages/image/src/image-viewer';

export default {
	name: 'confirm',
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
	watch: {
		show(val) {
			if (val === this.$options.name) {
				this.$ObjectMixed(this.form, this.value.form);
				console.log(this.value)
				this.PostName = this.value.PostList;
			}
		}
	},
	data() {
		return {
			PostName:[],
			isdisabled: true,
			viewIndex: -1,
			uploadcover: {
				url: API_URL + 'admin/upload',
				token: ''
			},
			form: {
                token: '',
                id:"",
                post_id:"",
                post_no:""
			}
		};
	},
	methods: {
		viewIndexClose() {
			this.viewIndex = -1;
		},
		submit() {

			console.log(this.form)
			// goodsDeliver(this.form).then(res => {
			// 	this.$message.success({
			// 		message: res.msg || '操作成功'
			// 	});
			// 	this.$emit('visibleChange', { getList: true, show: '' });
			// });
		},
		close() {
			this.$emit('visibleChange', { getList: false, show: '' });
		},
		closed() {
			Object.assign(this.$data, this.$options.data());
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
