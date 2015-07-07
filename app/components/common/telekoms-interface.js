/**
 * Created by student on 2015-06-16.
 */
angular
    .module('myApp.telekomsInterface', [])
    .service('telekomsInterface', function (telekomRequest, dyzuryRequest, delegacjeRequest, modalSrv, $timeout, $rootScope, $filter) {
        var telekomsInterface = {

            dnidyz: [
                {
                    "mies": "I",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "II",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "III",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "IV",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "V",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "VI",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "VII",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "VIII",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "IX",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "X",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "XI",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    "mies": "XII",
                    "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            sumadyz: 0,
            sumabdyz: 0,

            dyzwroku: function () {
                var mies, dzp, dzk;
                var dp = new Date();
                var dk = new Date();
                for (var i = 0; i < 12; i++) {
                    for (var k = 0; k < 31; k++) {
                        dk.setFullYear($rootScope.rokb);
                        dk.setMonth(i);
                        dk.setDate(k + 1);
                        telekomsInterface.dnidyz[i].value[k] = 0;
                        if (dk.getDay() == 6 || dk.getDay() == 0) telekomsInterface.dnidyz[i].value[k] = 2;
                        //console.log('weekendy: ', i+1, k+1, dk.getDay(), dk.toDateString());
                    }
                };
                telekomsInterface.sumadyz = 0;
                telekomsInterface.sumabdyz = 0;
                for (var i = 0; i < telekomsInterface.datadyzur.length; i++) {
                    var dyzur = telekomsInterface.datadyzur[i];
                    dp = dyzur.datapocz;
                    dk = dyzur.datakonc;
                    mies = $filter('date')(dp, 'M');
                    dzp = $filter('date')(dp, 'dd');
                    dzk = $filter('date')(dk, 'dd');
                    if ($filter('date')(dp, 'yyyy') == $rootScope.rokb) {
                        for (var l = dzp; l <= dzk; l++) {
                            telekomsInterface.dnidyz[mies - 1].value[l - 1] = 1;
                            telekomsInterface.sumadyz += 1;
                            if (mies == $rootScope.miesb) {
                                telekomsInterface.sumabdyz += 1;
                            };
                        };
                    }
                }
            },

            fetch: function () {
                telekomRequest.fetch(function (responseData) {
                    telekomsInterface.items = responseData;
                    //console.log('telekomInterface - ', telekomsInterface.items);
                });
            },
            delete: function (item) {
                modalSrv.show('components/modal/modal-remove-telekom-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        telekomRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var itemindex = _.indexOf(telekomsInterface.items, item);
                            telekomsInterface.items.splice(itemindex, 1);
                            //toaster.pop('success', 'Pracownik został usunięty.');
                            $timeout(function () {
                                alert('usunięto!');
                            })
                        })
                    });
            },

            deletedyzur: function (item) {
                //console.log('Dyzur item - ', item);
                modalSrv.show('components/modal/modal-remove-dyzur-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        dyzuryRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var itemindex = _.indexOf(telekomsInterface.datadyzur, item);
                            telekomsInterface.datadyzur.splice(itemindex, 1);
                            //toaster.pop('success', 'Dyżur został usunięty.');
                            telekomsInterface.dyzwroku();
                            $timeout(function () {
                                alert('usunięto!');
                            })
                        })
                    });
            },

            deletedeleg: function (item) {
                //console.log('Deleg item - ', item);
                modalSrv.show('components/modal/modal-remove-deleg-tpl.html',
                    item,
                    'sm',
                    function (data) {
                        delegacjeRequest.delete(_.pick(data, 'id'), function (responseData) {
                            var d = new Date();
                            var itemindex = _.indexOf(telekomsInterface.delegacje, item);
                            telekomsInterface.sumakil -= parseInt(telekomsInterface.delegacje[itemindex].kilometry);
                            telekomsInterface.sumagodz -= parseInt(telekomsInterface.delegacje[itemindex].nadgodziny);
                            d = telekomsInterface.delegacje[itemindex].datadel;
                            mies = $filter('date')(d, 'M');
                            telekomsInterface.datakm[0].values[mies - 1].value -= parseInt(telekomsInterface.delegacje[itemindex].kilometry);
                            telekomsInterface.datandg[0].values[mies - 1].value -= parseInt(telekomsInterface.delegacje[itemindex].nadgodziny);
                            telekomsInterface.delegacje.splice(itemindex, 1);

                            $timeout(function () {
                                alert('usunięto!');
                            })
                        })
                    });
            },

            add: function (item) {
                modalSrv.show('components/modal/modal-add-telekom-tpl.html',
                    item,
                    '',
                    function (data) {
                        data.title = 'pracownik';
                        telekomRequest.add(data, function (responseData) {
                            //console.log('response',responseData );
                            telekomsInterface.items.push(responseData);
                            //toaster.pop('success', 'Dodano nowego pracownika.');
                            $timeout(function () {
                                alert('Dodano nowego pracownika!');
                            })
                        })
                    });
            },

            addyzur: function (item) {
                modalSrv.show('components/modal/modal-add-dyzur-tpl.html',
                    item,
                    '',
                    function (data) {
                        data.idem = $rootScope.dataid;
                        data.datapocz = $filter('date')(data.datapocz, 'yyyy-MM-dd', 'GMT+0200');
                        data.datakonc = $filter('date')(data.datakonc, 'yyyy-MM-dd', 'GMT+0200');
                        var self = this;
                        //console.log('Daty: ', data.datapocz, data.datakonc);
                        dyzuryRequest.add(data, function (responseData) {
                            telekomsInterface.datadyzur.push(responseData);
                            //toaster.pop('success', 'Dodano dyżur pracownika.');
                            telekomsInterface.dyzwroku();
                            $timeout(function () {
                                alert('Dodano dyżur pracownikaa!');
                            })
                        })
                    });
            },

            addeleg: function (item) {
                modalSrv.show('components/modal/modal-add-deleg-tpl.html',
                    item,
                    '',
                    function (data) {
                        var d = new Date();
                        data.idem = $rootScope.datadelid;
                        d = $filter('date')(data.datadel, 'yyyy-MM-dd', 'GMT+0200');
                        data.datadel = d;
                        delegacjeRequest.add(data, function (responseData) {
                            //console.log('response',responseData );
                            d = $filter('date')(responseData.datadel, 'yyyy-MM-dd', 'GMT+0200');
                            responseData.datadel = d;
                            telekomsInterface.delegacje.push(responseData);

                            $timeout(function () {
                                var d = new Date();
                                telekomsInterface.sumakil += parseInt(responseData.kilometry);
                                telekomsInterface.sumagodz += parseInt(responseData.nadgodziny);
                                //console.log('Add deleg: ', telekomsInterface.sumakil, telekomsInterface.sumagodz);

                                d = responseData.datadel;
                                mies = $filter('date')(d, 'M');
                                telekomsInterface.datakm[0].values[mies - 1].value += parseInt(responseData.kilometry);
                                telekomsInterface.datandg[0].values[mies - 1].value += parseInt(responseData.nadgodziny);
                                alert('Dodano delegację pracownikaa!');
                            })
                        })
                    });
            },

            updatedeleg: function (item) {
                modalSrv.show('components/modal/modal-add-deleg-tpl.html',
                    item,
                    '',
                    function (data) {
                        var d = new Date();
                        data.idem = $rootScope.datadelid;
                        d = $filter('date')(data.datadel, 'yyyy-MM-dd', 'GMT+0200');
                        data.datadel = d;
                        delegacjeRequest.update(data, function (responseData) {
                            d = $filter('date')(responseData.datadel, 'yyyy-MM-dd', 'GMT+0200');
                            responseData.datadel = d;
                            //console.log('response',responseData );
                            //telekomsInterface.delegacje.push(responseData);

                            $timeout(function () {
                                var d = new Date();
                                telekomsInterface.sumakil += parseInt(responseData.kilometry);
                                telekomsInterface.sumagodz += parseInt(responseData.nadgodziny);
                                //console.log('Add deleg: ', telekomsInterface.sumakil, telekomsInterface.sumagodz);

                                d = responseData.datadel;
                                mies = $filter('date')(d, 'M');
                                telekomsInterface.datakm[0].values[mies - 1].value += parseInt(responseData.kilometry);
                                telekomsInterface.datandg[0].values[mies - 1].value += parseInt(responseData.nadgodziny);
                                //toaster.pop('success', 'Zmieniono delegację pracownika.');
                                alert('Zmieniono delegację pracownikaa!');
                            })
                        })
                    });
            },

            update: function (item) {
                telekomRequest.update(item, function () {
                    //productsInterface.items.push(responseData.data);
                    $rootScope.userState.unsavedData = false;
                })
            }

        };
        return telekomsInterface;
    });