declare var daum;
declare var google;

export class DaumPostUtils {
    public static openPost() {
        let obj = 'daumPostCode',
            em = document.getElementById(obj),
            daumPostCode = new daum.Postcode({
                oncomplete: function(data) {
                    em.style.display = 'none';
                    let userSelectAddr: string = '';
                    // 도로명 주소 선택시(R)
                    // 지번 주소를 선택시(J)
                    if (data.userSelectedType === 'R') {
                        userSelectAddr = data.roadAddress;
                    } else {
                        userSelectAddr = data.jibunAddress;
                    }
                    document.querySelector('.addr')['value'] = userSelectAddr;
                    document.querySelector('.OADDR')['value'] = data.jibunAddress;
                    document.querySelector('.NADDR')['value'] = data.address;
                    document.querySelector('.ADDRST')['value'] = data.userSelectedType;
                    document.querySelector('.ADDRBC')['value'] = data.bcode;
                    document.querySelector('.ADDRZC')['value'] = data.zonecode;
                    document.querySelector('.postcode')['value'] = data.zonecode;

                    let fullAddr = userSelectAddr;
                    let geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address: fullAddr }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            document.querySelector('#LON')[
                                'value'
                            ] = results[0].geometry.location.lng();
                            document.querySelector('#LAT')[
                                'value'
                            ] = results[0].geometry.location.lat();
                        }
                    });
                },
                width: '100%',
                height: '100%'
            });

        daumPostCode.embed(em);
        em.style.display = 'block';
    }
}
