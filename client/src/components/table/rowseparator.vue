<template lang="html">
    <tr>
        <td>
            <div class="ch-separator">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            </div>
        </td>

        <td colspan="3">

        <div class="row-separator">
            <div class="separate-string">{{ grTitle }}</div>
        </div>

    </td></tr>
</template>
<script>
export default {
    name: 'RowSeparator',
    props: {
        grTitle: String
    }
}
</script>