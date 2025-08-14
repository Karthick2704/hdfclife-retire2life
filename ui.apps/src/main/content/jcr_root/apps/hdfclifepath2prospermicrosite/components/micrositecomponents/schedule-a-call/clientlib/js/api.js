try {
    (function (u) {
        if (u) {
            var x = function (b) {
                b === Function && Object.defineProperty(Function.prototype, "name", {
                    get: function () {
                        var q = "";
                        if (void 0 !== this.hasOwnProperty && "function" === typeof this.hasOwnProperty && this.hasOwnProperty("name")) {
                            q = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
                            try {
                                Object.defineProperty(this, "name", {
                                    value: q
                                })
                            } catch (f) {
                                console.info(this, " already name defined")
                            }
                        }
                        return q
                    }
                });
                if ("function" === typeof b) {
                    var r = b.toString().split("function ")
                        , k = r && 1 < r.length ? r[1].split("()")[0] : "";
                    try {
                        Object.defineProperty(b, "name", {
                            get: function () {
                                return k
                            }
                        })
                    } catch (q) {
                        console.info(this, " already name defined")
                    }
                }
            };
            Object.getOwnPropertyNames(u).filter(function (b) {
                return "function" === typeof u[b] && void 0 === u[b].name
            }).forEach(function (b) {
                x(u[b])
            })
        }
    }
    )(window);
    (function () {
        function u(x, b) {
            b = b || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var r = document.createEvent("CustomEvent");
            r.initCustomEvent(x, b.bubbles, b.cancelable, b.detail);
            return r
        }
        if ("function" === typeof window.CustomEvent)
            return !1;
        u.prototype = window.Event.prototype;
        window.CustomEvent = u
    }
    )();
    (function (u) {
        var x = function () {
            var b = {}
                , r = function () { }
                , k = function (g) {
                    if (w(navigator) && w(navigator.userAgent)) {
                        var p = /(Edge\/)/;
                        return /(Trident\/)/.test(navigator.userAgent) && (!0 === g ? p.test(navigator.userAgent) : !0)
                    }
                    return !1
                };
            b.isIE = b.isIE = k;
            var q = function (g) {
                return J(g) ? !g : g
            };
            b.notOperator = b.not = q;
            var f = function (g, p) {
                return q(J(g) && J(p)) ? !1 : g && p
            };
            b.andOperator = b.and = f;
            var l = function () {
                var g = !0, p;
                for (p in arguments)
                    g = f(g, arguments[p]);
                return g
            };
            b.andOperatorMany = b.andMany = l;
            var n = function (g, p) {
                return q(J(g) && J(p)) ? !1 : g || p
            };
            b.orOperator = b.or = n;
            var h = function () {
                var g = !1, p;
                for (p in arguments)
                    g = n(g, arguments[p]);
                return g
            };
            b.orOperatorMany = b.orMany = h;
            var t = function (g, p) {
                if (l(F(g), w(p), N(p))) {
                    var A = d(g, f);
                    if (a(p.length, 2))
                        for (var y = p[0], v = d(g, f) ? O : P, z = 1; m(z, p.length) && (A = g(A, c(y, p[z])),
                            !v(A)); z++)
                            ;
                    return A
                }
                return !1
            };
            b.orOneWithMany = b.orOneWithMany = function () {
                return t(n, arguments)
            }
                ;
            b.andOneWithMany = b.andOneWithMany = function () {
                return t(f, arguments)
            }
                ;
            var e = function (g, p, A) {
                return h(D(g), D(p), D(A)) ? !1 : g ? p : A
            };
            b.ternaryOperatorFunction = b.ternaryFunc = e;
            var d = function () {
                m(arguments.length, 2) && exceptionUtility.throwErr("Minumum 2 arguments required!");
                for (var g = 0; g < arguments.length - 1; g++)
                    if (arguments[g] !== arguments[g + 1])
                        return !1;
                return !0
            };
            b.isEqualByReference = b.isEqRef = d;
            var c = function (g, p, A) {
                g = String(g);
                p = String(p);
                !0 === A && (g = g.toLowerCase(),
                    p = p.toLowerCase());
                return d(g, p)
            };
            b.isEqualByValue = b.isEqVal = c;
            b.isEqualByValueMany = b.isEqValMany = function () {
                for (var g = 0; g < arguments.length - 1; g++)
                    if (!c(arguments[g], arguments[g + 1]))
                        return !1;
                return !0
            }
                ;
            b.isEqualByValueManyCI = b.isEqValManyCI = function () {
                for (var g = 0; g < arguments.length - 1; g++)
                    if (!c(arguments[g], arguments[g + 1], !0))
                        return !1;
                return !0
            }
                ;
            var a = function (g, p) {
                return I(g) && I(p) ? g > p : !1
            };
            b.isGreaterThan = b.isGt = a;
            var m = function (g, p) {
                return I(g) && I(p) ? g < p : !1
            };
            b.isLessThan = b.isLt = m;
            var w = function (g, p) {
                return q(D(g, !0 === p))
            };
            b.isDefined = b.isDef = w;
            var D = function (g, p) {
                return !0 === p ? void 0 === g : g ? !1 : !0
            };
            b.isUndefined = b.isUndef = D;
            var Q = function (g) {
                return c(g, null)
            };
            b.isNull = b.isNull = Q;
            b.isNonNull = b.isNonNull = function (g) {
                return !Q(g)
            }
                ;
            var P = function (g) {
                return !0 === g
            };
            b.isTrue = P;
            var O = function (g) {
                return !1 === g
            };
            b.isFalse = O;
            var F = function (g) {
                return w(g) && g instanceof Function
            };
            b.isFunction = b.isFunc = F;
            var G = function (g) {
                return w(g) && g instanceof Object
            };
            b.isObject = b.isObj = G;
            var R = function (g) {
                return w(g, !0) && (g instanceof String || typeof g === String.name.toLowerCase())
            };
            b.isString = b.isStr = R;
            var I = function (g, p) {
                g = f(!0 === p, !0 === g) ? 1 : f(!0 === p, !1 === g) ? 0 : g;
                return w(g, !0) && (g instanceof Number || typeof g === Number.name.toLowerCase())
            };
            b.isNumber = b.isNum = I;
            b.isInteger = b.isInt = function (g) {
                return I(g) && Number.isSafeInteger(g)
            }
                ;
            var J = function (g) {
                return g instanceof Boolean || typeof g === Boolean.name.toLowerCase()
            };
            b.isBoolean = b.isBool = J;
            var K = function (g) {
                return Array.isArray(g)
            };
            b.isArray = b.isArr = K;
            var N = function (g) {
                return w(g, !0) && w(g.length, !0)
            }
                , S = function (g) {
                    return N(g) && c(g.length, 0)
                };
            b.isEmpArr = b.isEmptyArray = S;
            b.isEmpObj = b.isEmptyObject = function (g) {
                return w(g) && G(g) && S(Object.keys(g))
            }
                ;
            b.isFormData = b.isFormData = function (g) {
                return F(FormData) ? g instanceof FormData : !1
            }
                ;
            b.arrayIncludes = b.arrIncludes = function (g, p) {
                return K(g) && !g.every(function (A, y, v) {
                    return A !== p
                })
            }
                ;
            b.arrFill = b.arrayFill = function (g, p) {
                return Array.apply(null, K(p) ? p : Array(p)).map(function () {
                    return G(g) ? jsHelper.cloneObj(g, !0) : g
                })
            }
                ;
            b.arrOfArrConcat = b.arrayOfArrayConcat = function (g) {
                return T(g).reduce(function (p, A) {
                    return p.concat(A)
                })
            }
                ;
            var U = function (g) {
                return g instanceof Date
            };
            b.isDate = b.isDate = U;
            var V = function (g) {
                return U(g) ? !0 : q("Invalid Date" === (new Date(Date.parse(g))).toDateString())
            };
            b.isValidDate = b.isValidDate = V;
            b.toISTDate = b.toISTDate = function (g) {
                !0 === k() && (g = g.replace(/-/g, "/"));
                V(g) && I(330) && (g = R(g) ? new Date(Date.parse(g)) : g,
                    g = new Date(Date.UTC(g.getFullYear(), g.getMonth(), g.getDate(), g.getHours(), g.getMinutes(), g.getSeconds(), g.getMilliseconds()) + 6E4 * (330 + g.getTimezoneOffset())));
                return g
            }
                ;
            var W = function (g, p) {
                return G(g) ? g : G(p) ? p : Object.create({})
            };
            b.toObject = b.toObj = W;
            var T = function (g, p) {
                return K(g) ? g : K(p) ? p : Object.create([])
            };
            b.toArray = b.toArr = T;
            b.toString = b.toStr = function (g, p) {
                return w(g) ? String(g) : w(p) ? String(p) : String()
            }
                ;
            b.toNumber = b.toNum = function y(p, A) {
                return f(w(p, !0), q(c(Number(p), Number.NaN))) ? Number(p) : I(A, !0) ? y(A, Number.NaN) : Number.NaN
            }
                ;
            var L = function (p) {
                return e(G(p), Object.keys(p), [])
            };
            b.objectKeys = b.objKeys = L;
            b.objectValues = b.objVals = function (p) {
                return L(p).map(function (A) {
                    return p[A]
                })
            }
                ;
            var M = function (p) {
                return Object.freeze(p)
            };
            b.freezeObject = b.freezeObj = M;
            b.deepFreezeObject = b.deepFreezeObj = function y(A) {
                for (var v in A) {
                    var z = A[v];
                    G(z) && y(z)
                }
                return M(A)
            }
                ;
            b.toCamelCase = b.toCC = function (A) {
                return A.split(/[_-]|\s+/).map(function (y, v) {
                    return c(v, 0) ? y.toLowerCase() : y.charAt(0).toUpperCase() + y.slice(1).toLowerCase()
                }).join("")
            }
                ;
            b.toSentence = b.toSentc = function (A) {
                return A.split(/[_-]|\s+/).map(function (y, v) {
                    return y.charAt(0).toUpperCase() + y.slice(1).toLowerCase()
                }).join(" ")
            }
                ;
            var aa = function (A) {
                var y = Object.create({});
                Object.keys(W(A)).forEach(function (v) {
                    y[v] = A[v]
                });
                return y
            }
                , ba = function v(y) {
                    var z = {}, B;
                    for (B in y)
                        z[B] = F(y[B]) ? y[B] : G(y[B]) ? v(y[B]) : y[B];
                    return z
                };
            b.cloneObject = b.cloneObj = function (y, v) {
                return !0 === v ? ba(y) : aa(y)
            }
                ;
            b.defineReadOnlyObjectProperty = b.defineReadOnlyObjProp = function (y, v, z) {
                Object.defineProperty(y, v, {
                    get: function () {
                        return z
                    }
                });
                return !0
            }
                ;
            b.defineObjectProperty = b.defineObjProp = function (y, v, z) {
                F(z) || (z = r);
                Object.defineProperty(y, v, {
                    get: F(propsObj[key]) ? propsObj[key] : r,
                    set: function (B) {
                        z(key, B)
                    }
                });
                return !0
            }
                ;
            b.defineReadOnlyObjectProperties = b.defineReadOnlyObjProps = function (y, v) {
                var z = {};
                L(v).forEach(function (B) {
                    z[B] = {
                        get: function () {
                            return v[B]
                        }
                    }
                });
                return Object.defineProperties(y, z)
            }
                ;
            b.defineObjectProperties = b.defineObjProps = function (y, v, z, B) {
                F(B) || (B = r);
                var C = {};
                L(v).forEach(function (E) {
                    C[E] = {
                        get: F(v[E]) ? v[E] : r,
                        set: function (H) {
                            B(E, H)
                        }
                    }
                });
                return Object.defineProperties(y, C)
            }
                ;
            b.flattenObject = b.flattenObj = function z(v) {
                var B = {}, C;
                for (C in v)
                    if (v.hasOwnProperty(C))
                        if (G(v[C])) {
                            var E = z(v[C]), H;
                            for (H in E)
                                E.hasOwnProperty(H) && (B[C + "." + H] = E[H])
                        } else
                            B[C] = v[C];
                return B
            }
                ;
            b.unflattenObject = b.unflattenObj = function (v) {
                var z = {}, B;
                for (B in v) {
                    var C = B.split(".");
                    C.reduce(function (E, H, X) {
                        return E[H] || (E[H] = isNaN(Number(C[X + 1])) ? C.length - 1 == X ? v[B] : {} : [])
                    }, z)
                }
                return z
            }
                ;
            b.mapFlatObject = b.mapFlatObj = function (v, z, B) {
                if (l(w(v), w(z), w(B)))
                    return Object.keys(v).forEach(function (C) {
                        B[v[C]] = z[C]
                    }),
                        B
            }
                ;
            var Y = function (v) {
                return JSON.parse(v)
            };
            b.parseJson = Y;
            var Z = function (v) {
                return JSON.stringify(v)
            };
            b.stringifyJson = Z;
            b.cloneJson = function (v) {
                return Y(Z(v))
            }
                ;
            b.extendFunction = b.extendFunc = function (v, z) {
                return f(F(v), F(z)) ? (z.prototype = Object.create(v.prototype),
                    z.prototype.constructor = z,
                    !0) : !1
            }
                ;
            return M(b)
        }();
        x.defineReadOnlyObjProp(u, "jsHelper", x)
    }
    )(window || this || {});
    (function (u) {
        var x = function (b) {
            var r = {}
                , k = function (q) {
                    throw Error(b.toStr(q));
                };
            r.throwErr = r.throwError = k;
            r.dependencyCheck = function (q, f) {
                Array.isArray(q) && q.filter(function (l) {
                    return b.isDefined(l)
                }).length == q.length || k(b.toStr(f) + " Module dependency missing!")
            }
                ;
            return b.freezeObj(r)
        }(u.jsHelper);
        u.jsHelper.defineReadOnlyObjProp(u, "exceptionUtility", x)
    }
    )(this);
    (function (u) {
        var x = u.jsHelper;
        exceptionUtility && exceptionUtility.dependencyCheck([x], "App Config");
        x = x.freezeObj({
            appName: "hdfclifeinsurancecompany",
            contentRoot: "/content/hdfclifeinsurancecompany",
            apiRoot: "/content/hdfclifeinsurancecompany/api",
            apiExtension: ".json"
        });
        u.jsHelper.defineReadOnlyObjProp(u, "appConfig", x)
    }
    )(this);
    (function (u) {
        var x = function () {
            var b = {
                mockRequest: {
                    name: "MOCK_API",
                    endpoint: "mockapi",
                    directCall: !0,
                    url: "https://api.hdfclife.com"
                },
                getPageRating: {
                    name: "GET_PAGE_RATING",
                    endpoint: "getpagerating",
                    directCall: !0,
                    url: "https://api.hdfclife.com/v1.0/page/page-rating/"
                },
                sendPageRating: {
                    name: "SEND_PAGE_RATING",
                    endpoint: "getpagerating",
                    directCall: !0,
                    url: "https://api.hdfclife.com/v1.0/page/page-rating/"
                },
                getPageViews: {
                    name: "GET_PAGE_VIEWS",
                    endpoint: "pageviews",
                    directCall: !0,
                    url: "https://api.hdfclife.com/v1.0/page/brandsite/page-plan-map/count/"
                },
                getAppLink: {
                    name: "GET_APP_LINK",
                    endpoint: "applink",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/account/app-link/"
                },
                subscribe: {
                    name: "SUBSCRIBE",
                    endpoint: "subscribe",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/account/subscribe/"
                },
                schdeuleACallback: {
                    name: "SCHEDULE_A_CALLBACK",
                    endpoint: "callmenow",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/call-me-now/create/"
                },
                availableslots: {
                    name: "AVAILIBILTY_SLOTS",
                    endpoint: "availableslots",
                    directCall: !0,
                    url: apiAvailableslots
                },
                customerCallSchedule: {
                    name: "CUSTOMER_CALL_SCHEDULE",
                    endpoint: "customercallschedule",
                    directCall: !0,
                    url: apiCallSchedule
                },
                unclaimedDividendDetails: {
                    name: "UNCLAIMED_DIVIDEND_DETAILS",
                    endpoint: "unclaimeddividenddetails",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/unclaimed-dividend-details/get/"
                },
                escalationLevelOne: {
                    name: "ESCALATION_LEVEL_ONE",
                    endpoint: "escalationlevelone",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/grievance-redressal/"
                },
                escalationLevelTwo: {
                    name: "ESCALATION_LEVEL_TWO",
                    endpoint: "escalationlevelTwo",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/grievance-redressal/"
                },
                escalationLevelPut: {
                    name: "ESCALATION_LEVEL_PUT",
                    endpoint: "escalationlevelPut",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/grievance-redressal/"
                },
                grievanceRedressalUserValidate: {
                    name: "GRIEVANCE_REDRESSAL_USER_VALIDATE",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/grievance-redressal-user-data/"
                },
                trackClaimRequest: {
                    name: "TRACK_CLAIM_REQUEST",
                    endpoint: "trackClaimRequest",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/claims-status/"
                },
                customersupport: {
                    name: "CUSTOMER_SUPPORT",
                    endpoint: "unclaimeddividenddetails",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/internal/get-bludart-airway-info/"
                },
                relationshipManagerContactUs: {
                    name: "RELATIONSHIP_MANAGER_CONTACT_US",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/connect-financial-advisor/create/"
                },
                fpnavproductlist: {
                    name: "FUND_PERFORMANCE_NAV_PRODUCT_LIST",
                    endpoint: "fpnavproductlist",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/funds/get-nav-products-list"
                },
                fpproductdata: {
                    name: "FUND_PERFORMANCE_PRODUCT_DATA",
                    endpoint: "fpproductdata",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/funds/get-product-funds-data/"
                },
                fpfundnav: {
                    name: "FUND_PERFORMANCE_FUND_NAV",
                    endpoint: "fpfundnav",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/funds/get-fund-nav/"
                },
                fpgetdata: {
                    name: "FUND_PERFORMANCE_DATA",
                    endpoint: "fpgetdata",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/funds/get-fund-performance-data/"
                },
                nomineeConnect: {
                    name: "NOMINEE_CONNECT",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/nominee-connect/"
                },
                feedbackFormConst: {
                    name: "FEEDBACK_FORM",
                    directCall: !0,
                    url: "https://api.hdfclife.com/forms/feedback/create/"
                },
                c2plcalculator: {
                    name: "C2PL_CALCULATOR",
                    endpoint: "c2plcalculator",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/application/c2pl/cost-of-delay/"
                },
                ipcities: {
                    name: "IP_CITIES",
                    endpoint: "ipcities",
                    directCall: !0,
                    url: "https://api.hdfclife.com/v1.0/core/insurance-profiler-city/"
                },
                ipcalculator: {
                    name: "IP_CALCULATOR",
                    endpoint: "ipcalculator",
                    directCall: !0,
                    url: "https://api.hdfclife.com/v1.0/core/insurance-profiler/"
                },
                ulipCalculator: {
                    name: "ULIP_CALCULATOR",
                    endpoint: "ulipCalculator",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/calculator/ulip-calculator/"
                },
                getAllFundNav: {
                    name: "GET_ALL_FUND_NAV",
                    directCall: !0,
                    url: "https://api.hdfclife.com/api/funds/get-all-fund-nav/"
                },
                subscribeInvestorRelations: {
                    name: "SUBSCRIBE_INVESTOR_RELATIONS",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/investor-financial-subscribe-unsubscribe/"
                },
                unSubscribeInvestorRelations: {
                    name: "UNSUBSCRIBE_INVESTOR_RELATIONS",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/investor-financial-subscribe-unsubscribe/"
                },
                groupTermRelationshipManger: {
                    name: "GROUP_TERM_RELATIONSHIP_MANAGER",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/group-term-relationship-manager/create/"
                },
                unclaimedDividendPolicyHolder: {
                    name: "UNCLAIMED_DIVIDEND_POLICY_HOLDER",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/unclaimed-policy-details/create/"
                },
                financialConsultant: {
                    name: "FINANCIAL_CONSULTANT",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/financial-consultant-details/"
                },
                insuranceCareers: {
                    name: "INSURANCE_CAREERS",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/job-campaign/create/"
                },
                glossaryContent: {
                    name: "GLOSSARY",
                    directCall: !0,
                    method: "GET",
                    url: "https://api.hdfclife.com/api/application-manager/glossary-terms/"
                },
                glossaryDetails: {
                    name: "GLOSSARY_DETAILS_API",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/application-manager/glossary-terms/"
                },
                qropsLead: {
                    name: "QROPS_LEAD",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/qrops/website/lead/save/"
                },
                potentialEarningCalculator: {
                    name: "POTENTIAL_EARNING_CALCULATOR",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/application/generate-lead-fc/"
                },
                testimonials: {
                    name: "TESTIMONIALS",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/testimonial-feedback/"
                },
                litePage: {
                    name: "LITE_PAGES",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/application/generate-lead/"
                },
                downloadBrochureViaEmail: {
                    name: "DOWNLOAD_BROCHURE_VIA_EMAIL",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/account/send-download-link/"
                },
                exideBecomeAdvisor: {
                    name: "BECOMEANADVISOR",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/campaigns/become-an-advisor/"
                },
                digifcForm: {
                    name: "DIGIFCFORM",
                    directCall: !0,
                    method: "POST",
                    url: "https://leadrouting-production.hdfclife.tech/api/v1/FreeFormLeads/"
                },
                encryption: {
                    name: "Encryption",
                    directCall: !0,
                    method: "POST",
                    url: "/content/hdfclifeinsurancecompany/api/encryption.json"
                },
                groupclaim: {
                    name: "GROUPCLAIM",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/group-claims-status/"
                },
                milkCenter: {
                    name: "MILKCENTER",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/campaigns/kmf-alliance/lead"
                },
                sendOtp: {
                    name: "SEND_OTP",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/send-otp/"
                },
                verifyOtp: {
                    name: "VERIFY_OTP",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/verify-otp/"
                },
                validateCustomer: {
                    name: "LIFE_SERVICE_VALIDATE_CUSTOMER",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/policy/validate-customer/"
                },
                lifeServiceSendOtp: {
                    name: "LIFE_SERVICE_SEND_OTP",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/send-otp/"
                },
                lifeServiceVerifyOtp: {
                    name: "LIFE_SERVICE_VERIFY_OTP",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/verify-otp/"
                },
                customerConcerns: {
                    name: "CUSTOMER_CONCERNS",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/forms/customer-concerns/"
                },
                betaInvite: {
                    name: "BETAINVITE",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/customer-service/beta-invite/"
                },
                accDelLogIn: {
                    name: "ACCDELLOGIN",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/account/v2/login/"
                },
                userVerifyOtp: {
                    name: "USERVERIFYOTP",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/account/v2/verify-otp/"
                },
                accDelVerifyOtp: {
                    name: "ACCDELVERIFYOTP",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/account/v2/otp/"
                },
                accDeleteUser: {
                    name: "ACCDELETEUSER",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/account/v2/delete-user/"
                },
                accLogoutUser: {
                    name: "ACCLOGOUTUSER",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/account/v2/logout/"
                },
                cancellationVOCSubmit: {
                    name: "MEDICALSCHEDULECALL",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/customer-service/voc-cancellation-survey/"
                },
                getCatPageRating: {
                    name: "GET_CAT_PAGE_RATING",
                    endpoint: "getcatpagerating",
                    directCall: !0,
                    url: "https://api.hdfclife.com/v1.0/page/category-pages-rating/"
                },
                starRatingSubmission: {
                    name: "RATINGSUBMISSION",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/customer-service/customer-feedback/"
                },
                medicalSchedulingCall: {
                    name: "MEDICALSCHEDULECALL",
                    directCall: !0,
                    method: "POST",
                    url: "https://api.hdfclife.com/api/customer-service/call-scheduler/medical/schedule/"
                },
                unsubscribe: {
                    name: "RATINGSUBMISSION",
                    directCall: !0,
                    method: "PUT",
                    url: "https://api.hdfclife.com/api/account/subscribe/"
                }
            }
                , r = {};
            Object.keys(b).forEach(function (k) {
                r[k] = jsHelper.freezeObj({
                    name: b[k].name,
                    endpoint: b[k].endpoint,
                    directCall: b[k].directCall,
                    url: b[k].url,
                    method: b[k].method
                })
            });
            return jsHelper.freezeObj(r)
        }();
        u.jsHelper.defineReadOnlyObjProp(u, "apiConfig", x)
    }
    )(window || document || {});
    (function (u) {
        var x = function (b) {
            function r(n, h, t, e, d) {
                var c = new XMLHttpRequest;
                c.timeout = 3E5;
                c.open("POST", t, !0);
                d && b.isObject(d) && Object.keys(d).forEach(function (a) {
                    c.setRequestHeader(a, d[a])
                });
                c.onreadystatechange = function () {
                    if (4 == this.readyState && 200 == this.status || 201 == this.status) {
                        if (b.isFunc(n))
                            try {
                                var a = JSON.parse(this.responseText).responseJson ? JSON.parse(this.responseText) : {
                                    responseJson: JSON.parse(this.responseText),
                                    statusCode: this.status
                                };
                                n(JSON.stringify(a))
                            } catch (m) {
                                n({
                                    success: !0,
                                    statusCode: this.status
                                })
                            }
                    } else
                        4 == this.readyState && 200 != this.status && b.isFunc(h) && h(this.responseText)
                }
                    ;
                c.onerror = function () {
                    b.isFunc(h) && h(this.responseText)
                }
                    ;
                c.send(e);
                return c
            }
            function k(n, h, t, e, d) {
                var c = new XMLHttpRequest;
                c.timeout = 3E5;
                c.open("PUT", t, !0);
                d && b.isObject(d) && Object.keys(d).forEach(function (a) {
                    c.setRequestHeader(a, d[a])
                });
                c.onreadystatechange = function () {
                    if (4 == this.readyState && 200 == this.status || 201 == this.status) {
                        if (b.isFunc(n))
                            try {
                                var a = JSON.parse(this.responseText).responseJson ? JSON.parse(this.responseText) : {
                                    responseJson: JSON.parse(this.responseText),
                                    statusCode: this.status
                                };
                                n(JSON.stringify(a))
                            } catch (m) {
                                n({
                                    success: !0,
                                    statusCode: this.status
                                })
                            }
                    } else
                        4 == this.readyState && 200 != this.status && b.isFunc(h) && h(this.responseText)
                }
                    ;
                c.onerror = function () {
                    b.isFunc(h) && h(this.responseText)
                }
                    ;
                c.send(e);
                return c
            }
            function q(n, h, t, e, d) {
                var c = new XMLHttpRequest;
                c.timeout = 3E5;
                c.open("GET", t, !0);
                d && b.isObject(d) && Object.keys(d).forEach(function (a) {
                    c.setRequestHeader(a, d[a])
                });
                c.onreadystatechange = function () {
                    if (4 == this.readyState && 200 == this.status) {
                        if (b.isFunc(n))
                            try {
                                var a = JSON.parse(this.responseText).responseJson ? JSON.parse(this.responseText) : {
                                    responseJson: JSON.parse(this.responseText),
                                    statusCode: this.status
                                };
                                n(JSON.stringify(a))
                            } catch (m) {
                                n({
                                    success: !0,
                                    statusCode: this.status
                                })
                            }
                    } else
                        4 == this.readyState && 200 != this.status && b.isFunc(h) && h(this.responseText)
                }
                    ;
                c.onerror = function () {
                    b.isFunc(h) && h(this.responseText)
                }
                    ;
                c.send(e);
                return c
            }
            function f(n, h, t, e, d, c) {
                var a = new XMLHttpRequest;
                a.open(c, t, !0);
                d && b.isObject(d) && Object.keys(d).forEach(function (m) {
                    a.setRequestHeader(m, d[m])
                });
                a.onreadystatechange = function () {
                    if (4 == this.readyState) {
                        switch (this.status) {
                            case 200:
                                var m = JSON.parse(this.responseText).responseJson ? JSON.parse(this.responseText) : {
                                    responseJson: JSON.parse(this.responseText)
                                };
                                n(JSON.stringify(m));
                                break;
                            case 201:
                                m = JSON.parse(this.responseText).responseJson ? JSON.parse(this.responseText) : {
                                    responseJson: JSON.parse(this.responseText)
                                };
                                n(JSON.stringify(m));
                                break;
                            default:
                                h(this.responseText)
                        }
                        b.isFunc(n)
                    } else
                        4 == this.readyState && 200 != this.status && b.isFunc(h) && h(this.responseText)
                }
                    ;
                a.onerror = function () {
                    b.isFunc(h) && h(this.responseText)
                }
                    ;
                a.send(e)
            }
            var l = {};
            exceptionUtility && exceptionUtility.dependencyCheck([b], "AJAX Utility");
            l.postJson = function (n, h, t) {
                if (!b.isObj(h))
                    throw Error("Request Data not defined!");
                var e = {};
                "form" == t ? (t = new FormData,
                    t.append("data", JSON.stringify(h)),
                    h = t) : (h = JSON.stringify(h),
                        e["Content-Type"] = "application/json");
                return new Promise(function (d, c) {
                    r(function (a) {
                        d(a)
                    }, function (a) {
                        c(a)
                    }, n, h, e)
                }
                )
            }
                ;
            l.putJson = function (n, h, t) {
                if (!b.isObj(h))
                    throw Error("Request Data not defined!");
                var e = {};
                "form" == t ? (t = new FormData,
                    t.append("data", JSON.stringify(h)),
                    h = t) : (h = JSON.stringify(h),
                        e["Content-Type"] = "application/json");
                return new Promise(function (d, c) {
                    k(function (a) {
                        d(a)
                    }, function (a) {
                        c(a)
                    }, n, h, e)
                }
                )
            }
                ;
            l.getJson = function (n, h, t, e) {
                b.isDef(h) && !b.isEmpObj(h.responseJson) && (t = Object.keys(h.responseJson).map(function (c) {
                    return c + "\x3d" + h.responseJson[c]
                }).join("\x26"),
                    n += "?" + t);
                var d = {};
                return new Promise(function (c, a) {
                    q(function (m) {
                        c(m)
                    }, function (m) {
                        a(m)
                    }, n, null, d)
                }
                )
            }
                ;
            l.getJson_WT = function (n, h, t, e) {
                if (!b.isObj(h))
                    throw Error("Request Data not defined!");
                b.isObj(h.headerJson) || (h.headerJson = {});
                h.headerJson["Content-Type"] = "application/json";
                var d = {}
                    , c = new FormData;
                c.append("data", JSON.stringify(h));
                return new Promise(function (a, m) {
                    q(function (w) {
                        a(w)
                    }, function (w) {
                        m(w)
                    }, n, c, d)
                }
                )
            }
                ;
            l.postFormData = function (n, h, t, e) {
                if (!b.isObj(h))
                    throw Error("Request Data not defined!");
                b.isObj(h.headerJson) || (h.headerJson = {});
                h.headerJson["Content-Type"] = "multipart/form-data";
                var d = {}
                    , c = new FormData;
                c.append("data", JSON.stringify(h));
                return new Promise(function (a, m) {
                    r(function (w) {
                        a(w)
                    }, function (w) {
                        m(w)
                    }, n, c, d)
                }
                )
            }
                ;
            l.ajaxJson = function (n, h, t, e) {
                if (b.isDef(h) && !b.isEmpObj(h)) {
                    var d = "";
                    Object.keys(h).forEach(function (c, a) {
                        d += 0 == a ? c + "\x3d" + encodeURIComponent(h[c]) : "\x26" + c + "\x3d" + encodeURIComponent(h[c])
                    });
                    return new Promise(function (c, a) {
                        f(function (m) {
                            c(m)
                        }, function (m) {
                            a(m)
                        }, n, d, e, t)
                    }
                    )
                }
                console.error("ERROR !!! Request JSON Not found")
            }
                ;
            return b.freezeObj(l)
        }(u.jsHelper);
        u.jsHelper.defineReadOnlyObjProp(u, "ajaxUtility", x)
    }
    )(this);
    (function (u) {
        var x = function (b, r, k, q) {
            exceptionUtility && exceptionUtility.dependencyCheck([b, r, k, q], "API Utility");
            var f = {}
                , l = function (e, d) {
                    var c = e.directCall ? "" : "form"
                        , a = e.directCall ? e.url : r.apiRoot + "/" + e.endpoint + r.apiExtension;
                    return new Promise(function (m, w) {
                        q.postJson(a, d, c).then(function (D) {
                            m(D)
                        }).catch(function (D) {
                            w(D)
                        })
                    }
                    )
                }
                , n = function (e, d) {
                    var c = e.directCall ? "" : "form"
                        , a = e.directCall ? e.url : r.apiRoot + "/" + e.endpoint + r.apiExtension;
                    return new Promise(function (m, w) {
                        q.putJson(a, d, c).then(function (D) {
                            m(D)
                        }).catch(function (D) {
                            w(D)
                        })
                    }
                    )
                }
                , h = function (e, d) {
                    return new Promise(function (c, a) {
                        q.getJson(e.directCall ? e.url : r.apiRoot + "/" + e.endpoint + r.apiExtension, d).then(function (m) {
                            c(m)
                        }).catch(function (m) {
                            a(m)
                        })
                    }
                    )
                }
                , t = function (e, d, c) {
                    return new Promise(function (a, m) {
                        q.ajaxJson(e.url, d, e.method, c).then(function (w) {
                            a(JSON.parse(w))
                        }).catch(function (w) {
                            m(w)
                        })
                    }
                    )
                };
            f.MOCK_API = function (e) {
                return new Promise(function (d, c) {
                    h(k.mockRequest).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GET_PAGE_RATING = function (e) {
                return new Promise(function (d, c) {
                    l(k.getPageRating, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.SEND_PAGE_RATING = function (e) {
                return new Promise(function (d, c) {
                    l(k.sendPageRating, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GET_PAGE_VIEWS = function (e) {
                return new Promise(function (d, c) {
                    l(k.getPageViews, e, "form").then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GET_APP_LINK = function (e) {
                return new Promise(function (d, c) {
                    l(k.getAppLink, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.SUBSCRIBE = function (e) {
                return new Promise(function (d, c) {
                    l(k.subscribe, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.SCHEDULE_A_CALLBACK = function (e) {
                return new Promise(function (d, c) {
                    l(k.schdeuleACallback, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.AVAILIBILTY_SLOTS = function (e) {
                return new Promise(function (d, c) {
                    h(k.availableslots, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.CUSTOMER_CALL_SCHEDULE = function (e) {
                return new Promise(function (d, c) {
                    l(k.customerCallSchedule, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.UNCLAIMED_DIVIDEND_DETAILS = function (e) {
                return new Promise(function (d, c) {
                    h(k.unclaimedDividendDetails, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ESCALATION_LEVEL_ONE = function (e) {
                return new Promise(function (d, c) {
                    l(k.escalationLevelOne, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ESCALATION_LEVEL_TWO = function (e) {
                return new Promise(function (d, c) {
                    h(k.escalationLevelTwo, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ESCALATION_LEVEL_PUT = function (e) {
                return new Promise(function (d, c) {
                    n(k.escalationLevelPut, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GRIEVANCE_REDRESSAL_USER_VALIDATE = function (e) {
                return new Promise(function (d, c) {
                    l(k.grievanceRedressalUserValidate, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.TRACK_CLAIM_REQUEST = function (e) {
                return new Promise(function (d, c) {
                    h(k.trackClaimRequest, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.FUND_PERFORMANCE_NAV_PRODUCT_LIST = function (e) {
                return new Promise(function (d, c) {
                    l(k.fpnavproductlist, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.FUND_PERFORMANCE_PRODUCT_DATA = function (e) {
                return new Promise(function (d, c) {
                    l(k.fpproductdata, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.FUND_PERFORMANCE_FUND_NAV = function (e) {
                return new Promise(function (d, c) {
                    l(k.fpfundnav, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.FUND_PERFORMANCE_DATA = function (e) {
                return new Promise(function (d, c) {
                    l(k.fpgetdata, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.CUSTOMER_SUPPORT = function (e) {
                return new Promise(function (d, c) {
                    h(k.customersupport, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.RELATIONSHIP_MANAGER_CONTACT_US = function (e) {
                return new Promise(function (d, c) {
                    l(k.relationshipManagerContactUs, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.NOMINEE_CONNECT = function (e) {
                return new Promise(function (d, c) {
                    l(k.nomineeConnect, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.FEEDBACK_FORM = function (e) {
                return new Promise(function (d, c) {
                    l(k.feedbackFormConst, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.POTENTIAL_EARNING_CALCULATOR = function (e) {
                return new Promise(function (d, c) {
                    l(k.potentialEarningCalculator, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.DOWNLOAD_BROCHURE_VIA_EMAIL = function (e, d) {
                return new Promise(function (c, a) {
                    t(k.downloadBrochureViaEmail, e, d).then(function (m) {
                        c(m)
                    }).catch(function (m) {
                        a(b.isObj(m) ? "CallBack Error" : m)
                    })
                }
                )
            }
                ;
            f.TESTIMONIALS = function (e) {
                return new Promise(function (d, c) {
                    l(k.testimonials, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.C2PL_CALCULATOR = function (e) {
                return new Promise(function (d, c) {
                    l(k.c2plcalculator, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.IP_CITIES = function (e) {
                return new Promise(function (d, c) {
                    h(k.ipcities, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.IP_CALCULATOR = function (e) {
                return new Promise(function (d, c) {
                    l(k.ipcalculator, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ULIP_CALCULATOR = function (e) {
                return new Promise(function (d, c) {
                    l(k.ulipCalculator, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GET_ALL_FUND_NAV = function (e) {
                return new Promise(function (d, c) {
                    h(k.getAllFundNav, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.SUBSCRIBE_INVESTOR_RELATIONS = function (e, d) {
                return new Promise(function (c, a) {
                    t(k.subscribeInvestorRelations, e, d).then(function (m) {
                        c(m)
                    }).catch(function (m) {
                        a(b.isObj(m) ? "CallBack Error" : m)
                    })
                }
                )
            }
                ;
            f.UNSUBSCRIBE_INVESTOR_RELATIONS = function (e, d) {
                return new Promise(function (c, a) {
                    t(k.unSubscribeInvestorRelations, e, d).then(function (m) {
                        c(m)
                    }).catch(function (m) {
                        a(b.isObj(m) ? "CallBack Error" : m)
                    })
                }
                )
            }
                ;
            f.GROUP_TERM_RELATIONSHIP_MANAGER = function (e) {
                return new Promise(function (d, c) {
                    l(k.groupTermRelationshipManger, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.UNCLAIMED_DIVIDEND_POLICY_HOLDER = function (e) {
                return new Promise(function (d, c) {
                    l(k.unclaimedDividendPolicyHolder, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.FINANCIAL_CONSULTANT = function (e) {
                return new Promise(function (d, c) {
                    l(k.financialConsultant, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.INSURANCE_CAREERS = function (e) {
                return new Promise(function (d, c) {
                    l(k.insuranceCareers, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GLOSSARY = function (e) {
                return new Promise(function (d, c) {
                    h(k.glossaryContent, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GLOSSARY_DETAILS = function (e) {
                return new Promise(function (d, c) {
                    h(k.glossaryDetails, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.LITE_PAGES = function (e, d) {
                return new Promise(function (c, a) {
                    t(k.litePage, e, d).then(function (m) {
                        c(m)
                    }).catch(function (m) {
                        a(b.isObj(m) ? "CallBack Error" : m)
                    })
                }
                )
            }
                ;
            f.QROPS_LEAD = function (e) {
                return new Promise(function (d, c) {
                    l(k.qropsLead, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ENCRYPTION = function (e) {
                return new Promise(function (d, c) {
                    l(k.encryption, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.BECOMEANADVISOR = function (e) {
                return new Promise(function (d, c) {
                    l(k.exideBecomeAdvisor, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.DIGIFCFORM = function (e) {
                return new Promise(function (d, c) {
                    l(k.digifcForm, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GROUPCLAIM = function (e) {
                return new Promise(function (d, c) {
                    l(k.groupclaim, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.MILKCENTER = function (e) {
                return new Promise(function (d, c) {
                    l(k.milkCenter, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.SEND_OTP = function (e) {
                return new Promise(function (d, c) {
                    l(k.sendOtp, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.VERIFY_OTP = function (e) {
                return new Promise(function (d, c) {
                    l(k.verifyOtp, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.LIFE_SERVICE_VALIDATE_CUSTOMER = function (e) {
                return new Promise(function (d, c) {
                    l(k.validateCustomer, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.LIFE_SERVICE_SENDOTP = function (e) {
                return new Promise(function (d, c) {
                    l(k.lifeServiceSendOtp, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.LIFE_SERVICE_VERIFY = function (e) {
                return new Promise(function (d, c) {
                    l(k.lifeServiceVerifyOtp, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.CUSTOMER_CONCERNS = function (e, d) {
                return new Promise(function (c, a) {
                    t(k.customerConcerns, e, d).then(function (m) {
                        c(m)
                    }).catch(function (m) {
                        a(b.isObj(m) ? "CallBack Error" : m)
                    })
                }
                )
            }
                ;
            f.BETA_INVITE = function (e) {
                return new Promise(function (d, c) {
                    l(k.betaInvite, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ACC_DEL_LOGIN = function (e) {
                return new Promise(function (d, c) {
                    l(k.accDelLogIn, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ACC_DEL_USER_OTP_VERIFY = function (e, d) {
                return new Promise(function (c, a) {
                    t(k.userVerifyOtp, e, d).then(function (m) {
                        c(m)
                    }).catch(function (m) {
                        a(b.isObj(m) ? "CallBack Error" : m)
                    })
                }
                )
            }
                ;
            f.ACC_DEL_DELETE_OTP_VERIFY = function (e) {
                return new Promise(function (d, c) {
                    l(k.accDelVerifyOtp, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ACC_DEL_DELETE_USER = function (e) {
                return new Promise(function (d, c) {
                    l(k.accDeleteUser, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.ACC_DEL_LOGOUT_USER = function (e) {
                return new Promise(function (d, c) {
                    l(k.accLogoutUser, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.CANCELLATION_VOC = function (e) {
                return new Promise(function (d, c) {
                    l(k.cancellationVOCSubmit, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.GET_CAT_PAGE_RATING = function (e) {
                return new Promise(function (d, c) {
                    l(k.getCatPageRating, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.MEDICAL_SCHEDULE_CALL = function (e) {
                return new Promise(function (d, c) {
                    l(k.medicalSchedulingCall, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.RATING_SUBMISSION = function (e) {
                return new Promise(function (d, c) {
                    l(k.starRatingSubmission, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            f.UNSUBSCRIBE = function (e) {
                return new Promise(function (d, c) {
                    n(k.unsubscribe, e).then(function (a) {
                        b.isStr(a) && (a = b.parseJson(a));
                        b.isObj(a) ? d(a) : c(a)
                    }).catch(function (a) {
                        c(b.isObj(a) ? "CallBack Error" : a)
                    })
                }
                )
            }
                ;
            return b.freezeObj(f)
        }(u.jsHelper, u.appConfig, u.apiConfig, u.ajaxUtility);
        u.jsHelper.defineReadOnlyObjProp(u, "apiUtility", x)
    }
    )(this);
    (function (u) {
        var x = function (b) {
            exceptionUtility && exceptionUtility.dependencyCheck([b], "Base64");
            b = {};
            var r = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d",
                encode: function (k) {
                    var q = ""
                        , f = 0;
                    for (k = r._utf8_encode(k); f < k.length;) {
                        var l = k.charCodeAt(f++);
                        var n = k.charCodeAt(f++);
                        var h = k.charCodeAt(f++);
                        var t = l >> 2;
                        l = (l & 3) << 4 | n >> 4;
                        var e = (n & 15) << 2 | h >> 6;
                        var d = h & 63;
                        isNaN(n) ? e = d = 64 : isNaN(h) && (d = 64);
                        q = q + r._keyStr.charAt(t) + r._keyStr.charAt(l) + r._keyStr.charAt(e) + r._keyStr.charAt(d)
                    }
                    return q
                },
                decode: function (k) {
                    var q = ""
                        , f = 0;
                    for (k = k.replace(/[^A-Za-z0-9+/=]/g, ""); f < k.length;) {
                        var l = r._keyStr.indexOf(k.charAt(f++));
                        var n = r._keyStr.indexOf(k.charAt(f++));
                        var h = r._keyStr.indexOf(k.charAt(f++));
                        var t = r._keyStr.indexOf(k.charAt(f++));
                        l = l << 2 | n >> 4;
                        n = (n & 15) << 4 | h >> 2;
                        var e = (h & 3) << 6 | t;
                        q += String.fromCharCode(l);
                        64 != h && (q += String.fromCharCode(n));
                        64 != t && (q += String.fromCharCode(e))
                    }
                    return q = r._utf8_decode(q)
                },
                _utf8_encode: function (k) {
                    k = k.replace(/rn/g, "n");
                    for (var q = "", f = 0; f < k.length; f++) {
                        var l = k.charCodeAt(f);
                        128 > l ? q += String.fromCharCode(l) : (127 < l && 2048 > l ? q += String.fromCharCode(l >> 6 | 192) : (q += String.fromCharCode(l >> 12 | 224),
                            q += String.fromCharCode(l >> 6 & 63 | 128)),
                            q += String.fromCharCode(l & 63 | 128))
                    }
                    return q
                },
                _utf8_decode: function (k) {
                    var q = ""
                        , f = 0;
                    for (c1 = c2 = 0; f < k.length;) {
                        var l = k.charCodeAt(f);
                        128 > l ? (q += String.fromCharCode(l),
                            f++) : 191 < l && 224 > l ? (c2 = k.charCodeAt(f + 1),
                                q += String.fromCharCode((l & 31) << 6 | c2 & 63),
                                f += 2) : (c2 = k.charCodeAt(f + 1),
                                    c3 = k.charCodeAt(f + 2),
                                    q += String.fromCharCode((l & 15) << 12 | (c2 & 63) << 6 | c3 & 63),
                                    f += 3)
                    }
                    return q
                }
            };
            b.encode = r.encode;
            b.decode = r.decode;
            return u.jsHelper.freezeObj(b)
        }(u.jsHelper);
        u.jsHelper.defineReadOnlyObjProp(u, "base64", x)
    }
    )(this);
    (function (u) {
        var x = function (b) {
            var r = {}
                , k = function (f) {
                    if (b.isDefined(f)) {
                        var l = f.split("/");
                        f = l[0];
                        l[0] = l[1];
                        l[1] = f;
                        f = l.join("/")
                    }
                    return f
                };
            r.switchMonth = k;
            var q = function (f, l) {
                b.isTrue(l) && (f = k(f));
                if (b.isValidDate(f))
                    return b.isStr(f) && (f = new Date(Date.parse(f))),
                        f = f.toString(),
                        f = f.substring(4, f.length - 9).split(" "),
                        [f[1], f[0], f[2]].join("-")
            };
            r.toServiceDate = q;
            r.getTodayServiceDate = function () {
                return q(new Date)
            }
                ;
            r.toServiceAge = function (f, l) {
                f = b.isTrue(l) ? k(f) : f;
                if (b.isValidDate(f))
                    return b.isStr(f) && (f = new Date(Date.parse(f))),
                        Math.abs((new Date(Date.now() - f.getTime())).getUTCFullYear() - 1970)
            }
                ;
            r.toServiceGender = function (f) {
                if (b.isStr(f))
                    switch (f.toLowerCase()) {
                        case "male":
                            return "M";
                        case "female":
                            return "F";
                        case "transgender":
                            return "T"
                    }
            }
                ;
            r.toUIGender = function (f) {
                if (b.isStr(f))
                    switch (f.toLowerCase()) {
                        case "m":
                            return "Male";
                        case "f":
                            return "Female";
                        case "t":
                            return "Transgender"
                    }
            }
                ;
            r.toServiceHeight = function (f, l) {
                return b.isNum(b.toNum(f)) && b.isNum(b.toNum(l)) ? f + " ft " + l + " in" : ""
            }
                ;
            r.downloadPolicyDocument = function (f) {
                var l = function (e, d) {
                    var c = "";
                    e && "object" === typeof e && (!0 === d && (c += "?"),
                        Object.keys(e).forEach(function (a, m) {
                            0 !== m && (c += "\x26");
                            c += a + "\x3d" + e[a]
                        }));
                    return c
                }
                    , n = function (e, d) {
                        if (e && "string" === typeof e) {
                            var c = e.split("-");
                            c = c[c.length - 1]
                        } else
                            c = "";
                        e = {
                            p_policy_ref: e,
                            p_policy_reo: c,
                            user_name: "ONLINE",
                            plocationcode: "9906"
                        };
                        b.orOneWithMany(d, "8429", "8430", "8432") && (e.version = "",
                            e.imd_code = "55555557",
                            e.PRINT_FLAG = "ORG");
                        return l(e, !0)
                    }
                    , h = function (e) {
                        switch (e) {
                            case "8429":
                                return "/BagicNxt/dp/HGIaction.do";
                            case "8430":
                                return "/BagicNxt/dp/HGFaction.do";
                            case "8432":
                                return "/BagicNxt/dp/ECPaction.do";
                            case "8407":
                                return "/Insurance/critical-illness/showCIpdf.do"
                        }
                        return ""
                    }
                    , t = document.createElement("a");
                t.href = function (e) {
                    var d, c = new CustomEvent("osgi:AppConfig", {
                        detail: {
                            cb: function (a, m) {
                                a = m[a.ENDPOINT_URLS];
                                d = a.documentPolicyDocument ? a.documentPolicyDocument : "http://webservicesdev.bajajallianz.com"
                            }
                        }
                    });
                    document.dispatchEvent(c);
                    return d + h(e.productId) + n(e.policyNo, e.productId)
                }(f);
                t.target = "_blank";
                document.getElementsByTagName("body")[0].append(t);
                t.click()
            }
                ;
            return b.freezeObj(r)
        }(u.jsHelper);
        u.jsHelper.defineReadOnlyObjProp(u, "UIObjectUtility", x)
    }
    )(this);
    (function (u) {
        function x(n, h) {
            exceptionUtility && exceptionUtility.dependencyCheck([u.jsHelper], this.constructor.name);
            var t = u.jsHelper;
            this instanceof this.constructor || this instanceof arguments.callee || exceptionUtility.throwErr("Constructor " + this.constructor.name + " requires 'new'");
            t.isUndefined(n) && exceptionUtility.throwErr("'name' is mandatory!");
            t.isUndefined(h) && exceptionUtility.throwErr("'dataStoreType' is mandatory!");
            t.defineReadOnlyObjProps(this, {
                name: n,
                dataStoreType: h,
                dataStoreMap: f.get(h)
            });
            t.isUndefined(this.dataStoreMap.get(n)) && this.dataStoreMap.set(n, {})
        }
        function b(n) {
            x.call(this, n, "IN_MEMORY_DATA_STORE");
            jsHelper.freezeObj(this)
        }
        function r(n) {
            x.call(this, n, "LOCAL_STORAGE_DATA_STORE");
            jsHelper.freezeObj(this)
        }
        function k(n) {
            x.call(this, n, "SESSION_STORAGE_DATA_STORE");
            jsHelper.freezeObj(this)
        }
        function q(n, h) {
            if (jsHelper.isEqVal(h, "IN_MEMORY_DATA_STORE"))
                return new b(n);
            if (jsHelper.isEqVal(h, "LOCAL_STORAGE_DATA_STORE"))
                return new r(n);
            if (jsHelper.isEqVal(h, "SESSION_STORAGE_DATA_STORE"))
                return new k(n)
        }
        var f = new Map;
        f.set("LOCAL_STORAGE_DATA_STORE", new Map);
        f.set("SESSION_STORAGE_DATA_STORE", new Map);
        f.set("IN_MEMORY_DATA_STORE", new Map);
        f.set("INDEX_DB_DATA_STORE", new Map);
        x.prototype.set = function (n, h) {
            this.dataStoreMap.get(this.name)[n] = h;
            return this
        }
            ;
        x.prototype.unset = function (n, h) {
            this.dataStoreMap.get(this.name)[n] = jsHelper.isTrue(h) ? null : void 0;
            return this
        }
            ;
        x.prototype.get = function (n) {
            return this.dataStoreMap.get(this.name)[n]
        }
            ;
        x.prototype.delete = function (n) {
            return delete this.dataStoreMap.get(this.name)[n]
        }
            ;
        jsHelper.extendFunc(x, b);
        jsHelper.extendFunc(x, r);
        jsHelper.extendFunc(x, k);
        (function () {
            function n(d, c) {
                if (jsHelper.isDefined(d)) {
                    var a = jsHelper.parseJson(d);
                    if (jsHelper.not(jsHelper.isEmpObj(a))) {
                        var m = f.get(c);
                        Object.keys(a).forEach(function (w) {
                            m.set(w, a[w])
                        })
                    }
                }
            }
            var h = localStorage.getItem("__dataStore__");
            jsHelper.isDefined(h, !0) && (n(h, "LOCAL_STORAGE_DATA_STORE"),
                localStorage.removeItem("__dataStore__"));
            var t = sessionStorage.getItem("__dataStore__");
            jsHelper.isDefined(h, !0) && (n(t, "SESSION_STORAGE_DATA_STORE"),
                sessionStorage.removeItem("__dataStore__"));
            var e = function (d) {
                function c(a) {
                    if (jsHelper.and(jsHelper.isDefined(a), jsHelper.not(jsHelper.isEqVal(a.size, 0)))) {
                        var m = {};
                        a.forEach(function (w, D) {
                            m[D] = w
                        });
                        return jsHelper.toObj(m)
                    }
                }
                d = f.get("LOCAL_STORAGE_DATA_STORE");
                d = c(d);
                jsHelper.isDefined(d) && localStorage.setItem("__dataStore__", jsHelper.stringifyJson(d));
                d = f.get("SESSION_STORAGE_DATA_STORE");
                d = c(d);
                jsHelper.isDefined(d) && sessionStorage.setItem("__dataStore__", jsHelper.stringifyJson(d))
            };
            window.addEventListener("beforeunload", function (d) {
                e(d)
            });
            window.addEventListener("unload", function (d) {
                e(d)
            });
            window.addEventListener("pagehide", function (d) {
                e(d)
            })
        }
        )();
        var l = function (n) {
            exceptionUtility && exceptionUtility.dependencyCheck([n], "Data Store Utility");
            var h = {}
                , t = function (a, m) {
                    return n.isDefined(f.get(m).get(a), !0) ? q(a, m) : null
                }
                , e = function (a, m) {
                    f.get(m).set(a, Object.create({}));
                    return this
                }
                , d = function (a, m) {
                    f.get(m).delete(a);
                    return this
                };
            h.createDataStore = h.createDS = function (a) {
                return q(a, "IN_MEMORY_DATA_STORE")
            }
                ;
            h.createPersistentDataStore = h.createPDS = function (a) {
                return q(a, "LOCAL_STORAGE_DATA_STORE")
            }
                ;
            h.createSessionDataStore = h.createSDS = function (a) {
                return q(a, "SESSION_STORAGE_DATA_STORE")
            }
                ;
            h.getDataStore = h.getDS = function (a) {
                return t(a, "IN_MEMORY_DATA_STORE")
            }
                ;
            h.getPersistentDataStore = h.getPDS = function (a) {
                return t(a, "LOCAL_STORAGE_DATA_STORE")
            }
                ;
            h.getSessionDataStore = h.getSDS = function (a) {
                return t(a, "SESSION_STORAGE_DATA_STORE")
            }
                ;
            h.deleteDataStore = h.deleteDS = function (a) {
                return d(a, "IN_MEMORY_DATA_STORE")
            }
                ;
            var c = function (a) {
                return d(a, "LOCAL_STORAGE_DATA_STORE")
            };
            h.deletePersistentDataStore = h.deletePDS = c;
            c = function (a) {
                return d(a, "SESSION_STORAGE_DATA_STORE")
            }
                ;
            h.deletePersistentDataStore = h.deleteSDS = c;
            h.clearDataStore = h.clearDS = function (a) {
                return e(a, "IN_MEMORY_DATA_STORE")
            }
                ;
            h.clearPersistentDataStore = h.clearPDS = function (a) {
                return e(a, "LOCAL_STORAGE_DATA_STORE")
            }
                ;
            h.clearSessionDataStore = h.clearSDS = function (a) {
                return e(a, "SESSION_STORAGE_DATA_STORE")
            }
                ;
            return n.freezeObj(h)
        }(u.jsHelper);
        u.jsHelper.defineReadOnlyObjProp(u, "dataStoreUtility", l)
    }
    )(window || this || {});



    // (function(_global) {
    //     var schdeuleACallbackApiObj = (function() {
    //         var schdeuleACallbackApi = {};
    //         function schdeuleACallback(requestObject) {
    //             return new Promise(function(resolve,reject) {
    //                 apiUtility.SCHEDULE_A_CALLBACK(requestObject).then(function(res) {
    //                     resolve(res);
    //                 }).catch(function(err) {
    //                     reject(err);
    //                 })
    //             })
    //         }

    //         schdeuleACallbackApi.schdeuleACallback = schdeuleACallback;

    //         return jsHelper.freezeObject(schdeuleACallbackApi);
    //     })();
    //     _global.jsHelper.defineReadOnlyObjProp(_global, 'schdeuleACallbackApiObj', schdeuleACallbackApiObj);
    // })(window || document || {});

    // (function(_global) {
    //     var availableslotsApiObj = (function() {
    //         var availableslotsApi = {};
    //         function availableslots(requestObject) {
    //             return new Promise(function(resolve,reject) {
    //                 apiUtility.AVAILIBILTY_SLOTS(requestObject).then(function(res) {
    //                     resolve(res);
    //                 }).catch(function(err) {
    //                     reject(err);
    //                 })
    //             })
    //         }

    //         availableslotsApi.availableslots = availableslots;

    //         return jsHelper.freezeObject(availableslotsApi);
    //     })();
    //     _global.jsHelper.defineReadOnlyObjProp(_global, 'availableslotsApiObj', availableslotsApiObj);
    // })(window || document || {});

    (function (_global) {
        var customerCallScheduleApiObj = (function () {
            var customerCallScheduleApi = {};
            function customerCallSchedule(requestObject) {
                return new Promise(function (resolve, reject) {
                    apiUtility.CUSTOMER_CALL_SCHEDULE(requestObject).then(function (res) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    })
                })
            }

            customerCallScheduleApi.customerCallSchedule = customerCallSchedule;

            return jsHelper.freezeObject(customerCallScheduleApi);
        })();
        _global.jsHelper.defineReadOnlyObjProp(_global, 'customerCallScheduleApiObj', customerCallScheduleApiObj);
    })(window || document || {});

} catch (e) {
    console.warn("exception", e)
}