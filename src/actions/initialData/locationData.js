export const locationData = {
  busRoutes: [
    {
      id: 'bus-routes-1',
      nameBusRouter: 'R4A',
      name: 'R4A: Cảng Sông Hàn U+2013 Hòa Tiến​',
      title: 'Vé lượt: 6.000 đồng/lượt.',
      // route: [ // chieu di
      //   {
      //     id: 45813725054,
      //     name: "1. Số 171(Kim Liên) Nguyễn Văn Cừ",
      //     location: {
      //       lng: "108.11956612202619",
      //       lat: "16.13548288580201",
      //     },
      //   },
      //   {
      //     id: 23736020016,
      //     name: "2. 101 Nguyễn Văn Cừ",
      //     location: {
      //       lng: "108.11943246536552",
      //       lat: "16.1330679589498",
      //     },
      //   },
      //   {
      //     id: 93634785434,
      //     name: "3. Ximăng Ngũ Hành Sơn",
      //     location: {
      //       lng: "108.11930183932864",
      //       lat: "16.129617645548674",
      //     },
      //   },
      //   {
      //     id: 60174281885,
      //     name: "4. 19 Nguyễn Văn Cừ",
      //     location: {
      //       lng: "108.12076170018832",
      //       lat: "16.12411291753288",
      //     },
      //   },
      //   {
      //     id: 56018148863,
      //     name: "5. 957 Nguyễn Lương Bằng",
      //     location: {
      //       lng: "108.12813319223163",
      //       lat: "16.113172832903878",
      //     },
      //   },
      //   {
      //     id: 59844160910,
      //     name: "6. 817 Nguyễn Lương Bằng",
      //     location: {
      //       lng: "108.1328678568374",
      //       lat: "16.10496465057714",
      //     },
      //   },
      //   {
      //     id: 71130452298,
      //     name: "7. Đối diện 546 Nguyễn Lương Bằng",
      //     location: {
      //       lng: "108.13502209210294",
      //       lat: "16.10056869633681",
      //     },
      //   },
      //   {
      //     id: 99389515921,
      //     name: "8. 497 Nguyễn Lương Bằng",
      //     location: {
      //       lng: "108.14283634199731",
      //       lat: "16.090049322991707",
      //     },
      //   },
      //   {
      //     id: 72775849140,
      //     name: "9. 421 Nguyễn Lương Bằng",
      //     location: {
      //       lng: "108.1443112333489",
      //       lat: "16.086529256802432",
      //     },
      //   },
      //   {
      //     id: 81503232572,
      //     name: "10. 339 Nguyễn Lương Bằng",
      //     location: {
      //       lng: "108.14576615827266",
      //       lat: "16.08310841022624",
      //     },
      //   },
      //   {
      //     id: 70221867631,
      //     name: "11. Bệnh viện tâm thần ( 191 Nguyễn Lương Bằng )",
      //     location: {
      //       lng: "108.14718017413666",
      //       lat: "16.079549495480258",
      //     },
      //   },
      //   {
      //     id: 41326520907,
      //     name: "12. Trường Cao đẳng kế hoạch",
      //     location: {
      //       lng: "108.14856629195059",
      //       lat: "16.07616780566659",
      //     },
      //   },
      //   {
      //     id: 32000071132,
      //     name: "13. 27 Nguyễn Lương Bằng",
      //     location: {
      //       lng: "108.14997593480217",
      //       lat: "16.07265158955931",
      //     },
      //   },
      //   {
      //     id: 48606698914,
      //     name: "14. 755-757 Tôn Đức Thắng",
      //     location: {
      //       lng: "108.15049382856223",
      //       lat: "16.071478710446527",
      //     },
      //   },
      //   {
      //     id: 66257542530,
      //     name: "15. Khu vui chơi trẻ em đường Tôn Đức Thắng",
      //     location: {
      //       lng: "108.1536851717758",
      //       lat: "16.066212099622582",
      //     },
      //   },
      //   {
      //     id: 20258293417,
      //     name: "16. 459 Tôn Đức Thắng",
      //     location: {
      //       lng: "108.15917738570323",
      //       lat: "16.062519534602192",
      //     },
      //   },
      //   {
      //     id: 46650492161,
      //     name: "17. Showroom Trường Hải",
      //     location: {
      //       lng: "108.16293485105163",
      //       lat: "16.060033556305154",
      //     },
      //   },
      //   {
      //     id: 87495919007,
      //     name: "18. 341 Tôn Đức Thắng",
      //     location: {
      //       lng: "108.16663084854403",
      //       lat: "16.05721701505328",
      //     },
      //   },
      //   {
      //     id: 38401482396,
      //     name: "21. 137-139 Tôn Đức Thắng",
      //     location: {
      //       lng: "108.17353822118451",
      //       lat: "16.05815482711118",
      //     },
      //   },
      //   {
      //     id: 27151760837,
      //     name: "23. 559 Điện Biên Phủ",
      //     location: {
      //       lng: "108.18443206071548",
      //       lat: "16.06531725496157",
      //     },
      //   },
      //   {
      //     id: 11967948697,
      //     name: "24. 407 Điện Biên Phủ",
      //     location: {
      //       lng: "108.18889948560606",
      //       lat: "16.06571373878797",
      //     },
      //   },
      //   {
      //     id: 34625379221,
      //     name: "25. 311 Điện Biên Phủ",
      //     location: {
      //       lng: "108.19261595462079",
      //       lat: "16.06571987858083",
      //     },
      //   },
      //   {
      //     id: 12890057288,
      //     name: "26. 135 Điện Biên Phủ",
      //     location: {
      //       lng: "108.198956789357",
      //       lat: "16.065451341801396",
      //     },
      //   },
      //   {
      //     id: 17863963279,
      //     name: "27. Công viên 29/3",
      //     location: {
      //       lng: "108.20535155147641",
      //       lat: "16.06591589381512",
      //     },
      //   },
      //   {
      //     id: 59044047147,
      //     name: "28. Đối diện 36-38 Điện Biên Phủ",
      //     location: {
      //       lng: "108.20554552103773",
      //       lat: "16.065948404370776",
      //     },
      //   },
      //   {
      //     id: 49752407980,
      //     name: "29. 85 Lý Thái Tổ",
      //     location: {
      //       lng: "108.20818666467244",
      //       lat: "16.06617381074443",
      //     },
      //   },
      //   {
      //     id: 78919721742,
      //     name: "30. 331 Hùng Vương",
      //     location: {
      //       lng: "108.21061748697342",
      //       lat: "16.06655732264574",
      //     },
      //   },
      //   {
      //     id: 37316920688,
      //     name: "31. 103 Hùng Vương",
      //     location: {
      //       lng: "108.21802419064903",
      //       lat: "16.06806363675924",
      //     },
      //   },
      //   {
      //     id: 68657585998,
      //     name: "32. Công viên Hùng Vương",
      //     location: {
      //       lng: "108.22185444676832",
      //       lat: "16.06853163858333",
      //     },
      //   },
      //   {
      //     id: 42946084723,
      //     name: "33. ĐD 151 Trần Phú",
      //     location: {
      //       lng: "108.22366291157324",
      //       lat: "16.067069408678766",
      //     },
      //   },
      //   {
      //     id: 97079549931,
      //     name: "34. UBND quận Hải Châu",
      //     location: {
      //       lng: "108.22316873828835",
      //       lat: "16.06201652169169",
      //     },
      //   },
      //   {
      //     id: 27938902740,
      //     name: "35. Cầu Rồng (số chẵn đường Võ Văn Kiệt)",
      //     location: {
      //       lng: "108.23362603960751",
      //       lat: "16.0612211977039",
      //     },
      //   },
      //   {
      //     id: 83142694550,
      //     name: "36. BV Quận Sơn Trà",
      //     location: {
      //       lng: "108.2352356061066",
      //       lat: "16.058210689752826",
      //     },
      //   },
      //   {
      //     id: 91935067673,
      //     name: "37. Đối diện 1187 Ngô Quyền",
      //     location: {
      //       lng: "108.23640435593668",
      //       lat: "16.05437724498843",
      //     },
      //   },
      //   {
      //     id: 36712624053,
      //     name: "38. 180 Ngũ Hành Sơn",
      //     location: {
      //       lng: "108.23843515512749",
      //       lat: "16.047717526062446",
      //     },
      //   },
      //   {
      //     id: 73746606918,
      //     name: "39. 310A Ngũ Hành Sơn",
      //     location: {
      //       lng: "108.24056921979812",
      //       lat: "16.04269150637289",
      //     },
      //   },
      //   {
      //     id: 71174722900,
      //     name: "40. 370 Ngũ Hành Sơn",
      //     location: {
      //       lng: "108.24178308931015",
      //       lat: "16.040365103273437",
      //     },
      //   },
      //   {
      //     id: 1089882216,
      //     name: "41. Đối diện 40 Lê Văn Hiến",
      //     location: {
      //       lng: "108.24360637369601",
      //       lat: "16.036762818002703",
      //     },
      //   },
      //   {
      //     id: 28730544278,
      //     name: "42. Đài tưởng niệm liệt sĩ ngành bưu điện",
      //     location: {
      //       lng: "108.24435346413753",
      //       lat: "16.035307306640167",
      //     },
      //   },
      //   {
      //     id: 89841076757,
      //     name: "43. 160 Lê Văn Hiến",
      //     location: {
      //       lng: "108.24575742606396",
      //       lat: "16.03258417569197",
      //     },
      //   },
      //   {
      //     id: 43727677294,
      //     name: "44. 256 Lê Văn Hiến",
      //     location: {
      //       lng: "108.24728405078287",
      //       lat: "16.02959699316708",
      //     },
      //   },
      //   {
      //     id: 73889873878,
      //     name: "45. 376 Lê Văn Hiến",
      //     location: {
      //       lng: "108.24936655066908",
      //       lat: "16.025458113763925",
      //     },
      //   },
      //   {
      //     id: 15473131950,
      //     name: "46. 470A Lê Văn Hiến",
      //     location: {
      //       lng: "108.25320435969822",
      //       lat: "16.017997676571692",
      //     },
      //   },
      //   {
      //     id: 97670525379,
      //     name: "47. 542 Lê Văn Hiến",
      //     location: {
      //       lng: "108.25544269233824",
      //       lat: "16.013469827365384",
      //     },
      //   },
      //   {
      //     id: 49032002190,
      //     name: "48. 618 Lê Văn Hiến",
      //     location: {
      //       lng: "108.25858691929429",
      //       lat: "16.007074987947718",
      //     },
      //   },
      //   {
      //     id: 9043915136,
      //     name: "50. E152 Trần Đại Nghĩa",
      //     location: {
      //       lng: "108.25601496154667",
      //       lat: "15.982131593324999",
      //     },
      //   },
      //   {
      //     id: 6620411317,
      //     name: "51. Bến xe buýt Đại học Việt Hàn",
      //     location: {
      //       lng: "108.25452232447924",
      //       lat: "15.974022216394241",
      //     },
      //   },
      // ],
      route: [
        // chieu ve
        {
          id: 64988500594,
          name: '1. Bến xe buýt Đại học Việt Hàn',
          location: {
            lng: ' 108.25452232447924',
            lat: '15.974022216394241'
          }
        },
        {
          id: 44542947981,
          name: '2. Tổ 24 Đông Trà Trần Đại Nghĩa',
          location: {
            lng: ' 108.25601409264209',
            lat: '15.982128086847377'
          }
        },
        {
          id: 59302065655,
          name: '3. E144 Trần Đại Nghĩa',
          location: {
            lng: ' 108.25601555517423',
            lat: '15.982134521508199'
          }
        },
        {
          id: 92311495570,
          name: '4. Sân tập lái ô tô đường Trần Đại Nghĩa',
          location: {
            lng: ' 108.25755685860983',
            lat: '15.989020788561273'
          }
        },
        {
          id: 38102128197,
          name: '6. 527 Lê Văn Hiến',
          location: {
            lng: ' 108.2598358826321',
            lat: '16.00160530322441'
          }
        },
        {
          id: 1489945413,
          name: '7. 509 Lê Văn Hiến',
          location: {
            lng: ' 108.25980398561187',
            lat: '16.002526668270605'
          }
        },
        {
          id: 90541027595,
          name: '8. 415 Lê Văn Hiến',
          location: {
            lng: ' 108.25929677344821',
            lat: '16.006366877017168'
          }
        },
        {
          id: 55388181530,
          name: '9. 307 Lê Văn Hiến',
          location: {
            lng: ' 108.25730216701777',
            lat: '16.010303979794397'
          }
        },
        {
          id: 78448601557,
          name: '10. 127 Lê Văn Hiến',
          location: {
            lng: ' 108.25104161718339',
            lat: '16.022860356737205'
          }
        },
        {
          id: 99099495924,
          name: '11. Doanh trại quân đội đường Lê Văn Hiến',
          location: {
            lng: ' 108.24558233887281',
            lat: '16.033630924778116'
          }
        },
        {
          id: 93647898660,
          name: '12. 61 Lê Văn Hiến',
          location: {
            lng: ' 108.2455846530745',
            lat: '16.03363255173983'
          }
        },
        {
          id: 42433897314,
          name: '13. 175 Ngũ Hành Sơn',
          location: {
            lng: ' 108.24269273776413',
            lat: '16.039267980391422'
          }
        },
        {
          id: 22527165793,
          name: '14. 133 Ngũ Hành Sơn',
          location: {
            lng: ' 108.24081970838753',
            lat: '16.042832723761766'
          }
        },
        {
          id: 43565727447,
          name: '16. Đại học Kinh Tế',
          location: {
            lng: ' 108.23864826341214',
            lat: '16.047831351519566'
          }
        },
        {
          id: 47999657228,
          name: '17. 29 Ngũ Hành Sơn',
          location: {
            lng: ' 108.2374687610848',
            lat: '16.051795385002077'
          }
        },
        {
          id: 16044468164,
          name: '18. 1093 Ngô Quyền',
          location: {
            lng: ' 108.23596967118698',
            lat: '16.056546596467292'
          }
        },
        {
          id: 64468705678,
          name: '19. 1041 Ngô Quyền',
          location: {
            lng: ' 108.23521413301363',
            lat: '16.059080611091073'
          }
        },
        {
          id: 54210280031,
          name: '20. Cầu Rồng (số lẽ đường Võ Văn Kiệt)',
          location: {
            lng: ' 108.23337367661787',
            lat: '16.061547643585026'
          }
        },
        {
          id: 74055907217,
          name: '21. Bến chợ Hàn',
          location: {
            lng: ' 108.22505952774726',
            lat: '16.068023245407986'
          }
        },
        {
          id: 91892703865,
          name: '22. Đối diện 59 Hùng Vương',
          location: {
            lng: ' 108.21974747888261',
            lat: '16.06851859096782'
          }
        },
        {
          id: 90905599088,
          name: '23. 192 Hùng Vương',
          location: {
            lng: ' 108.21741182319265',
            lat: '16.068016981544414'
          }
        },
        {
          id: 41365286036,
          name: '24. Chợ Cồn',
          location: {
            lng: ' 108.21463722946298',
            lat: '16.06747745758302'
          }
        },
        {
          id: 43735396198,
          name: '25. 10 Lý Thái Tổ',
          location: {
            lng: ' 108.20997834512136',
            lat: '16.066550421874894'
          }
        },
        {
          id: 65985234074,
          name: '26. 130 Lý Thái Tổ',
          location: {
            lng: ' 108.20739171149656',
            lat: '16.066230361801473'
          }
        },
        {
          id: 71548065487,
          name: '27. Siêu thị Nguyễn Kim',
          location: {
            lng: ' 108.20344655109668',
            lat: '16.066440031526586'
          }
        },
        {
          id: 55232164545,
          name: '28. 130 Điện Biên Phủ',
          location: {
            lng: ' 108.19934642887499',
            lat: '16.065790588557025'
          }
        },
        {
          id: 36094653626,
          name: '29. 336 Dien Bien Phu',
          location: {
            lng: ' 108.19298386072211',
            lat: '16.066008524369792'
          }
        },
        {
          id: 85894915006,
          name: '30. 416 Điện Biên Phủ',
          location: {
            lng: ' 108.18939272362793',
            lat: '16.06603870641431'
          }
        },
        {
          id: 54079578036,
          name: '31. 570 Điện Biên Phủ',
          location: {
            lng: ' 108.18418540896684',
            lat: '16.06564047162372'
          }
        },
        {
          id: 40819737113,
          name: '32. 128 Tôn Đức Thắng',
          location: {
            lng: ' 108.17443186308077',
            lat: '16.059094783578992'
          }
        },
        {
          id: 72977768680,
          name: '33. 210 Tôn Đức Thắng',
          location: {
            lng: ' 108.17140503578477',
            lat: '16.056918657023267'
          }
        },
        {
          id: 31274141904,
          name: '34. 294 Tôn Đức Thắng',
          location: {
            lng: ' 108.16828799015995',
            lat: '16.056472157983634'
          }
        },
        {
          id: 16177478534,
          name: '35. 422 Tôn Đức Thắng',
          location: {
            lng: ' 108.16259227747018',
            lat: '16.0604808300658'
          }
        },
        {
          id: 2842582593,
          name: '36. 552 Tôn Đức Thắng',
          location: {
            lng: ' 108.1588978340965',
            lat: ' 16.06296035431722'
          }
        },
        {
          id: 47408141498,
          name: '37. 640 Tôn Đức Thắng',
          location: {
            lng: ' 108.15641694044808',
            lat: '16.064640588035267'
          }
        },
        {
          id: 15342937407,
          name: '38. 758 Tôn Đức Thắng',
          location: {
            lng: ' 108.15311494705684',
            lat: '16.06686431208779'
          }
        },
        {
          id: 17433137744,
          name: '39. 806 Tôn Đức Thắng',
          location: {
            lng: ' 108.15191053145458',
            lat: '16.06856784996234'
          }
        },
        {
          id: 33691773345,
          name: '40. 50 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.1502324692913',
            lat: '16.072703094968304'
          }
        },
        {
          id: 69926925518,
          name: '41. 138 Nguyễn Lương',
          location: {
            lng: ' 108.14853636339204',
            lat: '16.076877264440945'
          }
        },
        {
          id: 41672371393,
          name: '42. 234 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.14693498683692',
            lat: '16.08073493405139'
          }
        },
        {
          id: 62247045988,
          name: '43. 290 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.14601475919088',
            lat: '16.082993153100066'
          }
        },
        {
          id: 34516189283,
          name: '44. 396 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.14414723834219',
            lat: '16.087288466292577'
          }
        },
        {
          id: 4475494251,
          name: '45. 438 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.14296086642372',
            lat: '16.090352775241932'
          }
        },
        {
          id: 78655892680,
          name: '46. 546 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.1353780100409',
            lat: '16.100182516489177'
          }
        },
        {
          id: 36606254970,
          name: '47. 636 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.13289700411802',
            lat: '16.105166546800323'
          }
        },
        {
          id: 53048929847,
          name: '48. 788 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.12971616629946',
            lat: '16.110726592257993'
          }
        },
        {
          id: 67407378835,
          name: '49. 922 Nguyễn Lương Bằng',
          location: {
            lng: ' 108.12690586319908',
            lat: '16.114912963638453'
          }
        },
        {
          id: 74243360749,
          name: '50. 52 Nguyễn Văn Cừ',
          location: {
            lng: ' 108.11990593830097',
            lat: '16.125726521072025'
          }
        },
        {
          id: 79195692918,
          name: '51. 274 Nguyễn Văn Cừ',
          location: {
            lng: ' 108.11980751312127',
            lat: '16.13537674376428'
          }
        }
      ]
    },
    {
      id: 'bus-routes-2',
      nameBusRouter: 'LK01',
      route: [
        {
          id: 45813725054,
          name: '1. Số 171(Kim Liên) Nguyễn Văn Cừ',
          location: {
            lng: '108.11956612202619',
            lat: '16.13548288580201'
          }
        }
      ]
    },
    {
      id: 'bus-routes-3',
      nameBusRouter: 'R16',
      route: [
        {
          id: 45813725054,
          name: '1. Số 171(Kim Liên) Nguyễn Văn Cừ',
          location: {
            lng: '108.11956612202619',
            lat: '16.13548288580201'
          }
        }
      ]
    },
    {
      id: 'bus-routes-4',
      nameBusRouter: 'R17A',
      route: [
        {
          id: 45813725054,
          name: '1. Số 171(Kim Liên) Nguyễn Văn Cừ',
          location: {
            lng: '108.11956612202619',
            lat: '16.13548288580201'
          }
        }
      ]
    },
    {
      id: 'bus-routes-5',
      nameBusRouter: 'R6A',
      route: [
        {
          id: 45813725054,
          name: '1. Số 171(Kim Liên) Nguyễn Văn Cừ',
          location: {
            lng: '108.11956612202619',
            lat: '16.13548288580201'
          }
        }
      ]
    }
  ]
}
