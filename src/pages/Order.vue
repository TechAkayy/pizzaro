<script setup>
	import { ref, watch } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useOrderStore } from '@/stores/order'

	const orderStore = useOrderStore()
	const { valid, count } = storeToRefs(orderStore)
	const { placeOrder } = orderStore

	const form = ref(null)
	const submitOrder = () => {
		if (form.value.validate()) {
			placeOrder()
		}
	}
</script>
<template>
	<v-container class="pl-1">
		<p
			class="font-weight-bold text-h5 text-md-h3 text-sm-h4"
			style="font-family: 'Playfair Display', serif !important"
		>
			My Order
		</p>
	</v-container>
	<v-form ref="form" lazy-validation v-model="valid">
		<v-row>
			<v-col>
				<EditCart style="height: 100%" />
			</v-col>
			<v-col cols="12" md="6" v-if="count !== 0">
				<v-row>
					<v-col cols="12" lg="false" md="false" xl="false">
						<EditDeliveryInfo style="height: 100%" />
					</v-col>
					<v-col cols="12" lg="false" md="false" xl="false">
						<EditPaymentMethod
							@submit-order="submitOrder"
							style="height: 100%"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" md="4"> </v-col>
		</v-row>
	</v-form>
</template>
<style></style>
