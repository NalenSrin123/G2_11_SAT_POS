<template>
    <div class="flex">
        <Sidebar_cashier/>
        <ReplaceVichka/>
        <PaymentConfirmation/>
    </div>
</template>

<script>
import Sidebar_cashier from '../../components/layout/Sidebar_cashier.vue';
import PaymentConfirmation from './PaymentConfirmation.vue';
import ReplaceVichka from './ReplaceVichka.vue';

export default {
   components: {
    Sidebar_cashier,
    ReplaceVichka,
    PaymentConfirmation
  }
}
</script>