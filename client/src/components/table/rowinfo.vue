<template lang="html">
    <tr><td colspan="4">

        <div class="anime-descryption">
            <div class="anime-descryption-header">
                <div class="hide-descryption">
                    <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                        <use xlink:href="#ico-up"/>
                    </svg>
                </div>          
            </div>

            <div class="anime-descryption-content">
                <div class="img-containcer">
                        <div class="m-1 d-flex justify-content-center d-flex align-items-start">
                            <img src="./../../assets/img/no_img.jpg" alt="NO-IMG" class="rounded" width="200" height="285">
                        </div>
                </div>

                <div class="descryption-containcer">
                    <div class="title-box">
                        <strong class="title-string">{{ animeTitle }}</strong>
                    </div>

                    <div class="descryption-box">
                        <div class="descryption-string">
                            {{ animeDescription }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </td></tr>
</template>
<script>
export default {
    name: 'RowDescription',
    data() {
        return {
            //Główne zmienne
            animeTitle: 'Hi Animu Mommy',
            animeDescription: 'Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker',
            animeImg: "???"
        }
    }
}
</script>
<style lang="css">
    
</style>