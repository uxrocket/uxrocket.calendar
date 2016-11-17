UX Rocket Calendar
=================
Calendar plugini, jQueryUI Calendar üzerine geliştirilmiştir. Orjinal plugindeki özelliklerin tamamı kullanılabilir. Ayrıca, takvim eklenen alanlarında `data` tanımları ile de ayarlar değiştirilebilir.

```HTML
<input type="text" class="calendar" />
<input type="text" id="start" class="calendar" data-calendar-after="#end" />
<input type="text" id="end" class="calendar" data-calendar-before="#start" />
<input type="text" class="calendar" data-time="true"/>
<input type="text" class="calendar" data-time-only="true"/>
```

### Notlar
Birbirine bağlı çalışan takvimlerde, `data-calendar-after` ve `data-calendar-before` tanımları ile, takvim alanlarının `id`leri ile birbirlerine bağlanır.


### Tanımlar
Property			 | Default			| Açıklama
-------------------- | ---------------- | --------
time                 | true             | Takvime saat ve dakika ekler.
timeOnly             | true             | Sadece saat seçimini gösterir.
controlType          | "select"         | Saat seçimi için slider ya da select box kullanımını belirler.
showOtherMonths      | true             | Takvim açıldığında, belirlenen ay dışında, diğer ayların da görüntülenmesine imkan verir.
selectOtherMonths    | true             | Takvim açıldığında, belirlenen ay dışında, diğer ayların da seçilebilmesine imkan verir.
changeMonth          | true             | Takvim açıldığında, ay değiştirme listesini gösterir
changeYear           | true             | Takvim açıldığında, yıl değiştirme listesini gösterir
dateFormat           | dd/mm/yy         | Seçilen tarihin, metin kutusunda hangi formatta gözükeceğini belirler.
yearRange            | c-10:c+10        | Takvimdeki yıl seçiminin aralığını belirtir. `c` şimdiki yılı gösterir. Başlangıç ve bitiş değerleri ":" ile ayrılarak yazılmalıdır. İster `c-nn:c+nn` şeklinde şimdiki yıla göre bir aralık belirlenebilir. İstenirse `nnnn:nnnn` şeklinde sabit bir aralık tanımlanabilir.
timeLimit            | false            | Timepicker componentinde çalışma anından büyük değerlerin seçilememesini sağlar.


Data Attribute 			   | &nbsp;
-------------------------- | -----
time                       | Takvime saat ve dakika ekler.
time-only                  | Sadece saat seçimini gösterir.
control-type               | Saat seçimi için slider ya da select box kullanımını belirler.
calendar-after             | Bağıl çalıştığı, sonraki ayları/günleri gösteren takvimi belirler. Bağlı çalışacağı takvimin IDsi değer olarak verilmelidir.
calendar-before            | Bağıl çalıştığı, önceki ayları/günleri gösteren takvimi belirler. Bağlı çalışacağı takvimin IDsi değer olarak verilmelidir.
number-of-months           | Takvim açıldığında kaç ayın gözükeceğini belirler.
date-format                | Seçilen tarihin, metin kutusunda hangi formatta gözükeceğini belirler.
year-range                 | Takvimdeki yıl seçiminin aralığını belirtir. `c` şimdiki yılı gösterir. Başlangıç ve bitiş değerleri ":" ile ayrılarak yazılmalıdır. İster `c-nn:c+nn` şeklinde şimdiki yıla göre bir aralık belirlenebilir. İstenirse `nnnn:nnnn` şeklinde sabit bir aralık tanımlanabilir.
time-limit                 | Timepicker componentinde çalışma anından büyük değerlerin seçilememesini sağlar.


Callback 			 | &nbsp;
-------------------- | -----
onReady              | Takvim, form elemanına bağlandığında çalışacak fonksiyonu çağırır.
onSelect             | Takvimden bir tarih seçildiğinde çalışacak fonksiyonu çağırır.
onClose              | Takvim kapatıldığında çalışacak fonksiyonu çağırır.
onRemove             | Eleman üzerinden takvim kaldırıldığında çalışacak fonksiyonu çağırır.


### Public Metodlar
Method						  | Açıklama
----------------------------- | -------------------------------------------------------
$(selector).calendar(options) | Bu method plugini manuel olarak bir elemana bağlamanızı sağlar.
$.uxcalendar                  | Bu method pluginin detayını görmenizi sağlar
$.uxcalendar.version          | Sayfaya eklenmiş pluginin versiyon numarasını gösterir.
$.uxcalendar.settings         | Aktif pluginin ayarlarını gösterir.
$.uxcalendar.remove(el)       | Elemanın üzerinden Takvim özelliğini kaldırır. `el` değeri boş gönderilirse, sayfadaki bütün Takvimleri kaldırır.
