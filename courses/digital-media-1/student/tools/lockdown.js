/* Lockdown exam mode for the CAPE Digital Media Unit 1 course. Developed by Kester Small.

   WHAT IT IS. A "lockdown-style" exam mode for graded tests. A web page cannot truly lock a device
   (it cannot stop Alt-Tab, a second device, a phone camera or screenshots), so this mode DETERS,
   DETECTS and LOGS, and locks a graded test after too many violations until a teacher unlocks it.

   GRADED TESTS (type ids)            testId format
     p1      Paper 01 past papers       p1-<paperId>        (course, view "paper")
     mock    Mock Paper 01s             mock-<paperId>      (course, view "paper")
     mtest   Module tests               mtest-<moduleId>    (course, view "test")
     p2bank  Paper 02 bank exam mode    p2bank-<paperId>    (games/paper2bank.html)
     dmtest1 Digital Media Test 1       dmtest1             (games/dmtest1.html)
     dmquiz1 Class quiz 1               dmquiz1             (games/dmquiz1.html)
   Practice activities and lesson screens are never locked.

   DATA SHAPES (v: 1). Times are ISO 8601 strings. Only ids are stored, never names from `user`.
     Event        { t, type, detail }   type is one of:
                  start | fullscreen | fullscreen-unavailable | violation (detail = fullscreen-exit |
                  tab-hidden | blur | left-page, plus " n/limit") | signal (extra detection in the same
                  absence) | return | blocked (detail = copy | cut | paste | select-all | print | drag |
                  context-menu | shortcut) | warning | autosubmit | submit | lockout | unlock (detail =
                  code | online) | code (class exam code applied)
     Attempt      { v, attemptId, testId, type, title, name, cls, userId, start, end, outMs,
                    violations, limit (0 = warn only), blocked, status: "in-progress" | "clean" | "flagged",
                    autoSubmitted, abandoned, locked, score: {right, total, pct} | null,
                    online: "pending" | "sent" | "not sent online", events: Event[] }
                  `name` and `cls` are what the student typed on the start screen (not a `user` profile).
     Lock         { v, testId, attemptId, title, type, lockedAt, userId, events: Event[] }
   STORAGE
     localStorage  capeDM1.lockdown.locks     { [testId]: Lock & { synced: boolean } }
                   capeDM1.lockdown.attempts  Attempt[] (latest 60, newest last)
                   capeDM1.lockdown.live      the running Attempt (for reload detection)
                   capeDM1.lockdown.code      class exam code typed by a student
                   capeDM1.lockdown.teacher   class exam code saved by the Teacher Edition on this device
     db (optional) examlogs/{userId}                         { v, lastAt, lastAttemptId }  (index doc)
                   examlogs/{userId}/attempts/{attemptId}    Attempt
                   examlogs/{userId}/locks/{testId}          Lock (deleted = unlocked)
   CODES
     Class exam code "PP-TTTTTT": PP = 10 settings bits, TTTTTT = tag made with the teacher secret.
     Unlock code "XXXXXX": made from the attempt id and the teacher secret.
     The secret lives only in tools/lockdown-key.js (Teacher Edition). This file holds one-way,
     slow hashes of the valid tags and codes (1,024 unlock slots), so the student page can check
     a code without containing the secret. */
(function () {
  'use strict';
  if (window.COURSE_LOCKDOWN) return;

  /*LDX_TABLES*/const ITER = 20000, CFG_T = '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', UNL_T = '3uPUOmO56oOS7npzWdGRnvVRQEQhb1GL0d6IloX+kHghVPTxyXDwkzcmiGbAfFe4il53ni3BsaUSKuD30nkvsm//paE0SGA1Yp1fvrmgEm1yjMduyq+UTT+BQ4zG3ZmpUT6eg7GZpw+9LKA3GOKd11qDAuD+4oXyi4sw2DlGlmS3i0Dc1KSlRlh7rv99fs1wu/89fGWYffuq8QBVyvhjs4vCfZJ8mM+n8P0UCWmdx5IblonGxpznoaEv5I3nUa9LLhEfM1bYkQRf4iKpFBf6cdjU0/G02bCNj5Mj+Uw3/3XKP0k/D55ax1G3iKz/43ynqmqSmxmNcTsezDchhLSq65BcAd2O/AjqlqNDTj23IBagwZyUNT9nxeM755D9rZtO7zTW2EZ9joBSuQjx3xXwM8ExlZoF6kuGr2xBEpH3gdqIScSmXJk/2/D0bzzl+jWrxo0U0ogjYrolUWzp6rfDEd3eqGw7CwjuOk9OwoJoLgs7OQYiaHAnnHLcKIpW43R0KvxJLbabPC99bkwmCkimGJaKqBbUfajPb1Bh1wczk+pCCcSy7zj3v99r8+rkYl03d8QsAu+WaLiUuDqOcVKvQc542jF9FMG2ORb7rUQVJ4zNnltcabWgeDjK1NGCOKAmAImVQ50yvgEHvXxnWzXyVs/d0VBP+JqNLrBnNhhfXeW5Us4HPLPnH0SRuHP2QGwfSr+LGBHoQ6KGbPdrXcRRguJqfSSjPS+J2ZVJps95/a2JJ/vxP5qU+czDpRuAs08Gw0qGEx5QtGPTa0qBWvU1jtOSYC7LgA2nZJ0rS76kyF4w9DqIT4z5XlSVvR4ib8y1vTDCpvXCFXRtYn+IlRhqgV16ncgnpRxkxixM79OfCoQ/XdJQD6xW15+KlsZD1UOBkbJEV7aBca3SBZt6ILeGXtZyQxU+GZxnpfeNUuDUea2Yk5ydT9N9I72tIos+BAQVyT+1B6frIKlXrCYM1NVa+JQ/Cbhthoc9U0owgGNYFNKthfSXjbD8ecR0dA2vV4XekxlrEGnfdRbDL55POMeQVNM4FPTownGhkueYOWXo7fmMJCFajompRDGJzV8CV4UBmJ1PX9Ux5sVJ646lTJvPicFFh4t5WKmntmLHF7uBJHSkZyxadjNgQldRIwjCkHeRKl1heHFlPNyBQ0f/AMzQ2UGtHhSJ9sv/R9A7WwrKxHD3o7NxU+odZaJU8ZBO8vEj2yEkGDUPNtqiiLVKsOkrh4FERkct1YsGKklPMFlz5gytL1f3IsyGkSEmQrbf7t9jKpI1AulNvkHhd+hGKS9I1nqfgR1XnpLqsG0mlIp0jj8YZ9br/fKFm0az7SPwRDXbW0qNF7SJrQMMoCZjJeCY75zWTk7OrxtC2lM0wu8ImMCIY5tPaoq/e4pHy8fWVsNpMv32f43hnMTgCBsSQEBrBGBAEjyN6Ylcof1uDRJh3u1FxJUsqHIHVxONYua0cQYczYxvmPwVEw3YhRtiIVD+7xDKMQG8w9doiHXug3bnZYEUx3BPU8om3V7jZsz0NoUxDbnJS7a1RPBzZezSxyM3xnxauDLJG1WGjqabpeGtaqCtogfxoK359sxO8dFKMZS7sj+YbPfx7OjJe4uh8rYRiTmH+367g3KJtp9tiViK76J3I/3PtB+fpMSzO/UkI65NODUeJhoQ8cUjx/v9pkEJrgdU2uifCgC3Hrr/4fIrzrnsbpOvVnPm5CQaN2GxEOO3Xo/Ih+lfX8fDP75PugThYHyVKOxAMGTW6eolPLGQqnqIJ1SjASW5G0EHxV93HkXhFhx798tbMjJYmNgI0Sr+8Ln0hKIdYeA/av1s0iXsFTFK959nD1cpoYG63p5T3ePjJrHa+BZ4af7PEdrU4GhZ8NQuWfq4LHWInMoaP6QozmDCRoUIV8Xyounec0fsk9BpMuhOgq+bUdroe6qokzuAtr/jJLuOJGlYN1Q6uIIZwWEsXc1Vz0sTrcOLQ21rf1aLIdvbgrJcubodGLK93XWV8HLW0S04lirXyG+k70y7PJbke/NCtWuO1oEtzRTfOMTj0UNUpn9aTAAk++gopgO0uOfm0FfLK/n5Og2NtoRqXazLT5NHpFxtQBD6lSwIkYOoi0UNDE6QEE5Ag3GXsw3uwPyD9IZ8W7GUKIkjSJXOaGrep241SJrKJ9vNhc/M65MrlWASPhMN0Rgki4bzDJhXEx53N88QfZamCAYG28/GGipsG2NIVLvBIOZGX/CqPo7q47lU7XwtHUMBim0EJhHmL6tcyOCJscFz9ZlG8OsupLuN0OlzYQOelVlDGe7SXClHPBx5hxRz/BOozEbpMpB7f8WA5ZDDaHQTVkIFEsj19bI8cuZ24P1MEBb88Qm3YIPUXnJ1WzH1puh01nmdXoX3bTn7/27YhZHjxg4vTkqPBQp9hBPoQvZdN4XGSEUdo12JvW/2r9kULt9W0NLPqNqC288OwjeT9XC+UDa3hpkGJcK5LBjSU2Kbk8sw3jEWW9wEkgzzXTG/ZrMY0diHHfOcIQqqIWFQFOj5kSHY0neR7H6e4ZKW6Puu28A+DYCN4tf7A9npxVo168VBlw3I/qs3GFf6rMzyoAtwOVY1U1ev46595GimE2skWSTpec4dXIYYyqNbOKSowp8e8VFVGoISYpiPWJh8+Uc6XFYI+7bDdkSfQyiUBsXfq1nOk56Xj8QRBo+xe38VYrUGRHUHyCdPnvHYS3jVvnHXaafTdlO6jCn++9Gv4JQ7M1A8k2A02Evf5rNUVLglu/xCZpksEzSkoQKeBjgY+3HyBwW3PDev7pSeHuvyHBM43eh8zak7fAXS01bosZRmGGxAkd+q/B0/T9y+y7eTdWS43UPllNkrZ9yXaAIi4DoGLgPnziJWEK+u42uD9cirGHCP2+Qb5gd4E0UDiHuHYcvRWHYeTtP/rJrImp3WLDXkJmhcJTnJWv+GfyTRn0Yuj6ZGRksyrvNm4t6Fn1ODiKGnFneUNPnMrA5qk9RkxFYRuU269v5Z/kyUcuG4ovJpy/CAfsgJq1GyBuiMVKC3UYxFbQfaurczOcKzP8IlIcYE74AY2nQVK4DPcm16JGWrL88UEOVWQGlEXaYDainbJ63HM5+vj2ps1enououIJ/VAIJFdTThtJOFjjfkPiGGEswxSK3wsfLMp5FDENR9DEpKRqLlKXsif7aZJoj/ka9Y70tkJxm7nS615hio0YCcPv3Oeqk6AD64LfXYgB8iXbkQ0CdhCg4F0hXG7B0G3P3uXjxhdOtX29tEU4NOOna136XpHMLqh0Kfb+oYaXWFHibc4oprZUv7B/yfJ8gcNuiw3uL3mOK6phw/3c4GMNL5EoMYodcxFRGTMlbenK4LoeTpxdVp37pVJ47YzbIkG9bv8i4C/j19gy52X4QZzz/mFdX6X3AVTh/3iSLxTNRTd4/06ek3ki6cGKf1Q1OXQLT4veEgdsk75VNzn9PeKCFr1QCz7YD/OpdoxMLhTBXhXPa94f6NAyFw/+CKM90S9HiyUTfebCWGT7IeF+Vrful6cOwYBo6lBHClLZq7EHpmg4gPadXjQNt9KkegqwntE/LbqOSJObqeTq0YbmfrMx89BamLTY34gGcuRs4RXbetcIPwBmtL5HS2Fx7eHtlVstl7HlsfXzEFJapWunwbpX1jnWif6foTNrryHHe5qv1otdBHTBaRfvT70PNKv4yU7XrxpVFA8nC1xwiwq3R4hEBFxUfPGIi8u3ywQy3NeA21VIXpH1DIwZ4wY949oh9FtSc/h/RMRdIf0ttgk4Ql9DwShMFBl/JkY2H9Wro40Dd3umashSticYKfInX786ipb5drTrEf0aQwyMw2BX0PUX9YKxjdnEVBcGFOAKYnaIrp+agmvltidvhwXivdX6xR8mSUFEkUQuBM9jXlgi2fGUq8jjqFkNqOLFE4784HFnOdxaSvLk2yXxtlTW9MbgQypaPbs+oF5JNrsSCZ4bWyi2YlKzyMtopxOpkYm3x287/Sa+En1kNfLJ46Fy59sotHNBbbxdqfeXWeowTR3vVYLq5kXmO/XHwCYCxl0Op7kRFvdi2qV7vS0tiOUaxmPthTjWeX7yIt2HjCWR7awfoA+LH+Z52SGw76WyEgj7SDAT3SQazcyo9Md6sWXB1HO0rV6NQapcUelTiOB85vAUxPbSCZZIsDWoE1cT+sq3Og3XZeq9BKfJz1ICM7/KIybbcioabQoTQi2rvap+qqSpRUz8lrRQMwTwz9eKn53UPxj1V8tkoXn6ERvitRJ0zSi/b0/qSQjYtBdLSFlE40D5cFmES/JvCXP6aLVvjc2n05b8vzKvWOnVpKqetSgLmAbe13lhKMHDzADGz16Q1MVOu8XqU+qsWxeDFkrPUBicvoxUg9qzPgh8XjI+mlFZXdsR3dlMh808ZdCtUBzW7ceNvG52dSgFYoFUU47qDvqdjbGQtMWmwN7ggeXom/P0OtrzBkVSzdBLr49rBwSDgQApj0q0Oz7lvwnQEz++/BwNeaiKPqlxEp58mZaJWbzyuRTfbdMXtWqmucN3s5mbkqS2OvVXntpzATn1fijGf4E9rMYFo4dm65WLdJfINV7PK8HXU/iGoJb8N58Wzxr0iz/ToAbrPID/cqGCB+7uAwvfxRcWGF7XdLXJvDhXlVn7l1LAUsnFqsKRyjOxVsKdTMmmoUQwlUFi3REosUFcLxrMoiEnFeScJOWh3lWTKNcOYVQO2m4pJydpN/nGznchTNJmb1PRo68XssmBHpQ9H7b5n+4egkvdDTOtAy1fbgw1h+M1JKitXWJzzS5r0sfET07nCBCfe6Sziwy9Fcr8sEOJCQHInYH7yIK7ytmr+XibCJDd9DQaTO2R0e1e5mKGpdoXn3x06CNNmhgRHuS8vDdMNwrZ6DLY8Fd++se/k4wD2lv8XAzqz760HCXnrUdyK5bSQc03FE2SzxT3wc2h7jiaVxtgOELtcu6JcOyCr26rv/fnZw8BCyEqD3OfwqZmW2XdL5cLu4mJWAMhGZxY27Iw/+3Nr7EYkwAPoSFjclDvkv5YUX8CV/Vu6gIGsww0rd/EJn1Gc/kGobNJ5vjDMrY6rY6hGcq2OyoA9ksPEu2hRZM8/+nTy8X/fL9mY03xXQXu9Q0+FL/SH49IvZvhOgmlH0CF76YoxetA6hlQnV2S45ABfqvqpZM+FFdNnT+My8el8F2SdnsMl15ZM11b5EPK5qe36jKbqINZzFGXzjKN6qx182tkiBe+3jh11lfi7WnhLNxY/r7Mh/Hu0SNl9BqjOYwmXNBXplF+DaJRm7H/HZ64A1YfoizSUs7WgEXr9PDgAc1ZduRy2sjZG/ZUdFD6dLDjAsU46xDO6RhGx8QWjuCcoTVjfTrKnQlAyRtNiVokPoXaK375gQhNvwHZ26RdJ7GHBkzNTr2lKTybzZTLml1GvIaZ3+blEMMr+Ntj0Ab4lLPPzNg4Wr88NhMgpVGtRUEcJKOOwmYr8/KdG424pvmkdLlzOeYwe3pXMLoiCBSYPz5l9NprJXrv/BLBH5OEQnwqoAh4N35Z9TItxVjY/t7ho6XqXGw2X73ji2uLmLeofbemxaM3RilbDgpOQsbAMp2MOG5SqQFB4Cas9elOGvU/iDBe7X5WUN8j8+olKf/ecsvSOIlp/InKuqnZnas112nP6GH3AbOaKekGqTWBdohLJ6IQLqhnmIZp4HItmp9fqTZQNMbv3GKHRRUN3+JobQM+NpPWVoD8WP5zwac6S/0ZEzSlj0Sc/vhjGFOd2SkCVBoBEHA9D6BlmwafLlR3zOWpIor6l0NCbR1i/cN4xkyrCJjv9Cj8d82Deod5CPNTCr2zyI3VTNNQZxaxkmPMbsjRILLBsIodv4K58O6xlkOeeDv+9sofDz4j/4nz3mvInvZjIR2y7gWFa2QRkTVxt6Tz2YGLAOwBCosqf7Ade32YuI85Ix6EVWvozzs1OLA6/cqUhiSUc4z7zsk0+lCGiJqlVhHmIBXELOQ2GqhswyA4tqnqofimLmK521YbtLbyZBO/dwKixDBYbkiyWKWkL9zrFj9JC4iuERJdE6RQFrcfed4Z+JTkPX9rLdUgQ629EwRkeGctTK+fvKJZZRowDtLz3L6j47pECZpEdDrnONmAfM91gJmhUfAevZ7KbjUKT3jsJjU5pj2TjHT0q13dL8Q31X/jKPf9DbrkMMY+RM99OBLonK0PRLm2Rl8mKCd3IjxixStE2D44+cwgy9kNRjO42/guInY99w8i+B75vL7WnR2PUnSfCJ9QOvlNRpAoJUoincLwqA5vGX6rN2LR7K4st5nZFq7t1UaSi0Z6NoMgAWV8e62qgAbYStq+wDILQAMOeNMcOTbiuNxRLCJM3QQYSEwtRx4h6WTmRRJAg8fQfmESbLRHYtmKYqymcMmaz3y6c03PBzknOGBHLwJ1iQgt1IAtyOHmYBNQJ/ZGPw/lfOfLCb3lXf17umTAJIdEmDXahwh5fXC6nYMwkfrPv+JqhlWdylguTNIeOsRTUbrbocMNvo3R8av8cf24OmiBVHmBTWAi5kKorKBfPqSipwMTQHQN/mrjHtQ+sWfX0ln0p0wqOfFcvHiZ9jrLd97gg42dTYlErqibp00J+KKddeElsB6G7NGO6RhRCoXo91kMu51BxfjlJobt4Lk/vXEI2l/1jTTjhQpn6Ko4gWm+TOyTil5+IuhYgwWvGgJgh9H/eYLe9EL8PKJRw92PmnjW+4Exv+d3q47AfuObK8m3wavMYUcMCghRYCQReR949bRts4/APCPcXJxPEn+hdUoGPssahGeSsWxHbcSWLEu15demAsoh+Ze8W1BQ0yiudCzDFb4GRK+Daz2U+IczRbFV6Xhn14r199p+yNLwLOIUHN2QpHrRvq1Sh8i7d1Q4ex4rAmYKcs54tuhnKSB3yhkXVEjhC7JFCx6YGV1s2lRm0e6Wu4QXNds3JtQ03f4uA5gfCsyJt9b4NB57Iat99Wl3qtJMBWmiH2ozfOF+xM9yznXmJhj5+3na6q84GPLba02XyW8JbQ2S6duUgRyBX3qMSvJmwdTj7NrNadKJpFwb3z2FQdg3Qozf+vp2y16qgezvuphCe2Z7FGFxgnzIoXomfLG9MH6Pp/3xdNq/4V0Rno7aeAeoovE2AL4El6ouM1pV9d1fART7nj7H99OOhBEP5eO0AkglEo3/yZkZHxuNNMKmxd2NWE8vs4950Zmc46WeUEpbQPghyMESZhSM+erLpL7u6IN1G5qz910CXCU4IDMBqPHm41X8c2Luq7bBptVDamTNNpGbPvMmJ/u/W7cwBbHwWM3DN195s16cqxliJhwipHcCIuMVkfFVnnYbkLjhgVt+tX5h53n2QyAnnmRhsbYRpzQlkvV2t3tQdhRZeFw9apfruZZm8+I6m8wGKnK/XUA8a/tGZKRVk4CfVjs6EgLgRrLLLgmZrG7a8dBaRb4mLij+RCx+ooEgcJNPUXWcca3OFdqISEkHAHxqpDK6zYPW2tpJYgoDVXmfSsJNYvchYxhuXVq47UNdIzS53Av8K9v1LQDEScqIjNPjz92qrb/MKq+y16QmfwHG8rQn/nsO92hrAP6yhhRDUD9V4oyVoK0/dT5aYo9ccQ/oi3godVDQzi/NZYlnAUopZT3TrcO2n2puoxQNEGPPGYH9csgvaVX5aOSpkZX5ApWZwT2h3FjdkD8f74B3pS9zTmDMeRBX5TThL8AanVc9NwFhy9bV9EjYN5S5lP5mYdqnKVkbcVhUPQKEIqAnsnegXsN1pNGPw/l4QDoxBJrqXUL5ME/rrcBAjTfWsAsFfjXWhLEh9JBV1kQ0yZlNMUQ01iK9pLIVTdkAQ77AwMgYfC53zrr0oWVyBT4JIzrUgFoKef5Usn7dnbUmtjTj6xzE/oYv+xpdTaeZiXcHOwcg5cFd3XMC10380zbQGoGVPNDQ/oO7a/hoaJEJ8ObpYixojoMwClCRdNfCK5o9Mt1/23F/GxfdFzgeko2aAhefQ5Jmy3jb2lJ0Rz5fZBn/oguq8ig1vrtjbkssm/AHdJHzAw8f8Qf/I8yCcdUuq2GzeFqI/oulrfNy2eiWYNvwiqGXzoZ5mA7jek+KS+gRVBFT1wTXTa8x5VuDUynaG9iDQ3Cliq9ZZ3nMZOKqQR8HIKeqlsS1ZtIrGNhWgbnqtDeOshNNlJsm7J7VMQunHnV81w0c/sa87fJmoYw57FiWlJOSclrzoXdzCl/pXphYzrTrrSIuwF8JsEKzw011ImU8OWAuew265033X50RYWItIiFTDGXAjMNfwKFGJO/QVgn4geEaaNP5Pd1YVooxBAyw8Rt3OW/s0rUtXMcFtWyWMxA/E99/0JOZCOLtWRunR1XjyQtiAtNEEPX49imEDpK9/g6LY4Ximd+5SG08cTpbtmh+3imAL27fE6DcryOAjhDo22Pxw/WhXJCj111tj4+PVWv6YqTgPk5XbcQy/y2YGsheexH5jprBSg35XNnKe7iGqmS+48s13VSfdwuF88tGlc5r6kMQXKG4F13UqVCGhvJ5XnJHcqKH/Yy/LqE8MBCUK/6VBL8rjbwqo3IhBZ03NSYyS+yxAa91M6q5DUI70pXytP0fDQQgd7HCiN7SfUP+ZHMK+jcGLNkcCPig+OL3B6y3ieZGrv5avqZb+uNP+ZH77YHrnp6LWYzMmvrI2BC5Oo3G4jbRW+iZ02qvaNXJVrcTHbcRyJsurwz2LjzexHR3wFa+6tvsKqnzCo1I7euAv1QP2WgvzhbA+EesJt9NznBIMmSc/dKUBKk3hhr3pLaXaMQsQ0Wz+rJ0jDMUSvgCRz/csbz4cK1awzcBdrzzYX1IzvUenYN0OtO/BUOx8emYY36LNFdupkmoi1WeAZUJAqvtVpML+SbFmtzFouv3H6Aj9dVHBsO98MAwpCgyTjbR5nwekKbAsK0SVrCYkMo+u3mUR3yhkuJzzV7SGOQeKNKl0oi9GJdEny7KI9LGZ+tUuTivofePSQeHeYOoz6WFO6cZ4rBMkMyG6QdKeGVBiUpHwMpdL0dWexIyOOMPzD8yuc6l2On0XnnO2AbqzlVdC1HkaFZFU8DIt1TnHLLyKnfT0q9dRXskccOlYl76R2Aw5VtDS282cdVI2acH1xKyrZlj5ZqFj6tMjl+9QuWazA+UtOY+KmZty8gAUwLHDqVkMY+1dcKWwKtWwcoN2PqYhtG7iPV/K/XOXp7He/53DceDQKGt39/4NTEDLDDUMyrF8jQol+oYovyK61QtgafxEo5VyoOTLgV6m5bRYViaXBvFm9nSdO/jcE18eLrygGLLwTypXMPhTNtNsl5v7zfhphALYdofTfa4ky5FcSj+5TU2okcUp9j0tOjMMIBtmUOAeyv1h0Rw3+9CoQDjuqypV6JUtWCFPMdSP1tmc+N2XDXmr3xmKDSUddF5dfG6bMIZjNcEIPezr0Ku5sPUf+oA19YISrl5OhPmMoWPSNEuGp9LFPuToTH5P79J6Cfc6E2WBmDnyAoUKdRIbCxziOsKlDoFkGhAe+JwQ+srOQQ/nBA6zzGFmJouBSco7fsnc0OqBf2bYAdsqXjBbe38GsPD+zIBtoDRUqfHuR9FkBvGzww+QXypghCHUBFnaCcWYzlQ9FQveWh/NljrmlpnKvxIq6o0PdqLkstkr4IYDWE5ZGjJHr2mmZumxvbRa/vgSBc8mBVyUqb9gZSygzPigiwzpcA+fQJPwoeaL2XqridhBaSvjMNBKYx8v0SIS6I4JQteHZNoux6NWoYEaB2zDdceS5Kjyy//v3BOPr3yPnYWZ1/GcQxLZtkwaZYGK8CYWrbJCN/AMiddNwCPU7If3qes2A1F6nbs/LCTbibrCDFGnHbB7KV5hlwQMWtFHfHmhZecOYMvww9Tyi9AsPkyZrinhyYnNW1FoJMbaedwdZYh81wYv9Z67iVSF4k1Ay+1fPi2F+Qn3FT+ysEj+9JbDc6G/i2bknWI36Qvz8pIvKbll5+EoNHXbfULtl2z3U/A1dbPXo3PZHoQrVioAypL5xxmFWlTwfmJxpHCUhkjTCmnQVMZ29MtZr4oZ7v5VXmix1s1amFBrqChONw+lIsnLC5EDBJLLpm329OEQS/sw1xrVrYP8k/3dTdO++9ABKd6ODU6RPSX3fg45g5syKx/2QqUCz3NpRCgzTt36Ei1TqAVVZ3nyxlJVUMw1xD3b79X5BHmov1eqcuJ8wz6jj+Y7CLzNdF9v2V5TFyi0QWzIQuM2YQnChCd0GfDQXNyAtGCfexmMr94CtGHbsVZ9+yD1o6NDOcozkragHZbEHy1C7571P00QgjzXBk8V9A80vBDTCq0TsrGs5h3FBV0+ughpSy8mB+92UomoRW7nPFlrwAk9h8+7mp0sjmQLvEP61sea3FHWJjFC+qzglngbyWkIKLoLNkZ1w43ja7+9HmEc0x1tl63ceZ3xaEusKFLe9Am+qnwB8AbMXUSEnrY4wfIMTKbzstMFY0aNb0I1acm6WLVQAv00yQy4KYk3RQQQBMq2O6iRs0pYMjCc9Ln5RYWZKUQN7CQFibdcjr5c8CWlzkQtg+NJEvtcSwjINA3FR4nL56GLnMcjY6FOZDay4XBMi59AS7BCtX/HUxdh0NycipoMUlTC7p1Jo+xzAqcehUkpdzxqtrVzHoQPfHXV5O1+F70JoJ/ruFflJzSYbwglcGBUfB7JjixoNIdDWkRWk+2r5GlM+LT5lBcXkqZAdW9cmUorWbxKF2SjLB4B0ZuNlz41ebiJm+gI314ES4Asgu78Um0DijhiRP/rifRz0zr4rLeMqgkFeRGUAoHTp9E3heEQ/daRair68INRtOqIG3sVNQEf8FGryBW7/d9Ew9H2OC64Thl8nPg13+MXaRQz/qSqBvUr3IYD7UHdEhb6h0b1jUN1t6sK2l36N5NJ1TWZBtPyX5BWhcgfcJgzwUfRVXYDqguOOGCbvOJjQyEsu0FGzqHvKLB0vgO+Kh2PhlrTUUayfutuROGlILOLCzwox6hBsy/IK9wAoEg9jdU6I7YuL7b05kA9k+Vfjr28R2/Q2MSEB8y7OOfkg6jsf30wrMlf4I48ADU/uvh3nNbO59fD8sKFcxy3hng2EurFSlB1PAKezsvnfArLoEZBu3/WEAQIJqdegyOBq442jvQlRVJYAMj9IbxgDNnmkfNuYZiHr44Z7d+y3ukx0D1N9i1lIBxFVF5pVm63UdWKU9REs6wOnRfrfd+ojrllILnpsjGWoy/Y991owE0pEnmypCT/3xpww5kvUeR2SPXvCwdblFaoADG+19eZPbYbZ199HGyliWiubbK1mdmNrKMhIXbps6b27jLaabryE554b9xZ9XDluc3CnEnHvuBYNvRoyUjZH9+hcvrDhMbLPUUPnw1aV5AofGWVWna3CvesB32WJM6YIwISgoQD8Z0/iBTJgJRh22BTmdpq8nUCbJjTSX3ojYSFGAFMWXbcGl3QNxrbuXQt+muGmjRMnbvFeAjurK9GIDLTH9r5EwYe2j51UJ3STjWCd1Y8X2uNeKA9DglslBIn48jVjZXjY6bqb45AR5fhMYRNYPPrggd+ImQ8SS8rED6wlTf3pE4iMYcxZqVRWOPMuZ1j+tqDrElDQhT4MvOP9mPSmz+JvCAfL2Fl3PzJ/09pwGjdzNsheHuVGkJztu/jQMQLqpGwHT/ajp3gFxlQiwuJSri7nbyqBM/PuXXUxMZktOF5wHM8S6jjfJP+BeQfPD/6Q4WyWXab9/AKTEY0cm6V2ofsTP6QEJKaPUK+wOgiksjl6U1hPlzy8J7OS17+WQcyVUMKozEfnE7fuLgubzUvDKaE99asN0qwTEUxEekyYftJN2Kfx80YhGOOJb3sgTdsfgjfTq42v9YGofy59ft0oGDBnz9ksIX1xJ4V+2Gjni6TD9RxxBffj1geFdm7kvd1yemBnYXNdYytR+vdp48r8OroHovzjUyVXa6Wy7AW9SHXZ5qt3+BXrP6Yb3Kzq0CYIZnOSK4qnXJ2ll9xq0BViF7SNgqegoErY67mX+nBsIP0TpzLAG5lDd0vKaz6fF8cWW/IYkJEQVfgyU2cXEwwNkBArtXolY17cqIbMkPfd+nx9yVHRz2bCfj3iyixEQkl3B+Gd0eNtvtmsQ2i8nT1vwfMtmQyuqnwcKTSKj1CFB8KMF0XjDB22gn7YYurHG4q0/0A8Jva7jx0KXNYBXz4vtDstgWv6krqa7jxCrsQ70HI8oAgs8KHvQEntfP63cYXUreZ41fhiG03ncphucE9X+Wr3E0hthTEHuSpxcFqC7DbSE';/*END_LDX_TABLES*/

  const IN_COURSE = !!window.COURSE_MODULES;
  const TEACHER = () => !!window.COURSE_TEACHER_EDITION; /* set after the tools scripts in teacher.html, so read it late */
  const ALPH = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const TYPES = [['p1', 'Paper 01 past papers'], ['mock', 'Mock Paper 01s'], ['mtest', 'Module tests'], ['p2bank', 'Paper 02 bank exam mode'], ['dmtest1', 'Digital Media Test 1'], ['dmquiz1', 'Class quiz: What Is Digital Media?']];
  const LIMITS = [0, 2, 3, 5];
  const DEFAULTS = { types: { p1: true, mock: true, mtest: true, p2bank: true, dmtest1: true, dmquiz1: true }, limit: 3, paste: true, adjust: false, src: 'course defaults' };
  const LSK = { locks: 'capeDM1.lockdown.locks', hist: 'capeDM1.lockdown.attempts', live: 'capeDM1.lockdown.live', code: 'capeDM1.lockdown.code', teacher: 'capeDM1.lockdown.teacher' };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  const iso = () => new Date().toISOString();
  const API = () => window.COURSE_API || null;
  const reduced = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };

  /* ---------------- SHA-256 (synchronous, bytes in, bytes out) ---------------- */
  const K256 = (() => { const k = [], pr = []; for (let n = 2; pr.length < 64; n++) if (pr.every(p => n % p)) pr.push(n); pr.forEach(p => k.push((Math.cbrt(p) % 1) * 4294967296 >>> 0)); return k; })();
  const H0 = (() => { const h = [], pr = []; for (let n = 2; pr.length < 8; n++) if (pr.every(p => n % p)) pr.push(n); pr.forEach(p => h.push((Math.sqrt(p) % 1) * 4294967296 >>> 0)); return h; })();
  const W = new Int32Array(64);
  function sha256(m) {
    const l = m.length, nb = ((l + 9 + 63) >> 6) << 6, b = new Uint8Array(nb); b.set(m); b[l] = 0x80;
    const dv = new DataView(b.buffer); dv.setUint32(nb - 4, (l * 8) >>> 0); dv.setUint32(nb - 8, Math.floor(l / 536870912));
    const H = H0.slice(); const r = (x, n) => (x >>> n) | (x << (32 - n));
    for (let o = 0; o < nb; o += 64) {
      for (let i = 0; i < 16; i++) W[i] = dv.getUint32(o + i * 4);
      for (let i = 16; i < 64; i++) { const a = W[i - 15], c = W[i - 2]; W[i] = (W[i - 16] + (r(a, 7) ^ r(a, 18) ^ (a >>> 3)) + W[i - 7] + (r(c, 17) ^ r(c, 19) ^ (c >>> 10))) | 0; }
      let [a, bb, c, d, e, f, g, h] = H;
      for (let i = 0; i < 64; i++) {
        const t1 = (h + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K256[i] + W[i]) | 0;
        const t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & bb) ^ (a & c) ^ (bb & c))) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + bb) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0; H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    const out = new Uint8Array(32), ov = new DataView(out.buffer); H.forEach((x, i) => ov.setUint32(i * 4, x >>> 0)); return out;
  }
  const utf8 = s => new TextEncoder().encode(s);
  const enc6 = h => { const v = ((h[0] << 22) | (h[1] << 14) | (h[2] << 6) | (h[3] >> 2)) >>> 0; let s = ''; for (let i = 0; i < 6; i++) s += ALPH[(v >>> (25 - 5 * i)) & 31]; return s; };
  const b64 = a => btoa(String.fromCharCode.apply(null, Array.from(a)));
  function verifier(x, salt) { let h = sha256(utf8(salt + '|' + x)); for (let i = 0; i < ITER; i++) h = sha256(h); return b64(h.slice(0, 9)); }
  const norm = s => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const slotOf = aid => { const h = sha256(utf8('slot|' + norm(aid))); return ((h[0] << 8) | h[1]) & 1023; };
  const KEY = () => window.COURSE_LOCKDOWN_KEY || null;

  /* ---------------- settings and class exam codes ---------------- */
  function encodeCfg(c) { let p = 0; TYPES.forEach(([t], i) => { if (c.types[t]) p |= 1 << i; }); p |= (Math.max(0, LIMITS.indexOf(c.limit))) << 6; if (c.paste) p |= 256; if (c.adjust) p |= 512; return p; }
  function decodeCfg(p) { const types = {}; TYPES.forEach(([t], i) => { types[t] = !!(p & (1 << i)); }); return { types, limit: LIMITS[(p >> 6) & 3], paste: !!(p & 256), adjust: !!(p & 512) }; }
  function cfgCodeFor(c) { const k = KEY(); if (!k) return null; const p = encodeCfg(c); return ALPH[(p >> 5) & 31] + ALPH[p & 31] + '-' + enc6(sha256(utf8(k + '|cfg|' + p))); }
  const vcache = {};
  function checkCfgCode(code) {
    const n = norm(code); if (n.length !== 8 || !CFG_T) return null;
    const a = ALPH.indexOf(n[0]), b = ALPH.indexOf(n[1]); if (a < 0 || b < 0) return null;
    const p = a * 32 + b; if (p > 1023) return null;
    const key = 'c' + n; if (!(key in vcache)) vcache[key] = verifier(n.slice(2), 'cfg' + p) === CFG_T.substr(p * 12, 12);
    return vcache[key] ? Object.assign(decodeCfg(p), { code: n.slice(0, 2) + '-' + n.slice(2) }) : null;
  }
  function unlockCodeFor(aid) { const k = KEY(); if (!k) return null; return enc6(sha256(utf8(k + '|unl|' + slotOf(aid)))); }
  function checkUnlock(aid, code) { const n = norm(code); if (n.length !== 6 || !UNL_T) return false; const s = slotOf(aid); return verifier(n, 'unl' + s) === UNL_T.substr(s * 12, 12); }
  function settings() {
    for (const [k, src] of [[LSK.code, 'class code'], [LSK.teacher, 'teacher settings on this device']]) {
      const c = lsGet(k); if (c) { const d = checkCfgCode(c); if (d) return Object.assign(d, { src }); }
    }
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
  const typeOn = t => !!settings().types[t];

  /* ---------------- local stores ---------------- */
  const locks = () => lsGet(LSK.locks) || {};
  const getLock = id => locks()[id] || null;
  function putLock(L) { const a = locks(); if (L.del) delete a[L.testId]; else a[L.testId] = L; lsSet(LSK.locks, a); }
  const history = () => lsGet(LSK.hist) || [];
  function saveAttempt(r) { const h = history().filter(x => x.attemptId !== r.attemptId); h.push(r); while (h.length > 60) h.shift(); lsSet(LSK.hist, h); }
  const attemptById = id => history().find(x => x.attemptId === id) || null;
  function newId() { const a = new Uint8Array(8); try { crypto.getRandomValues(a); } catch (e) { for (let i = 0; i < 8; i++) a[i] = Math.random() * 256; } let s = ''; a.forEach((x, i) => { s += ALPH[x & 31]; if (i === 3) s += '-'; }); return s; }
  const seg = s => String(s).replace(/[^A-Za-z0-9_\-.~:@+]/g, '_').slice(0, 120);

  /* ---------------- optional online log (db + user) ---------------- */
  let ONLINE = null, OWNER = false;
  const onlineP = (async () => {
    try {
      const c = window.claude; if (!c || typeof c.use !== 'function') return null;
      const [db, user] = await Promise.all([c.use('db'), c.use('user')]);
      if (!db || !user) return null;
      const uid = await user.id();
      try { OWNER = !!(await user.isOwner()); } catch (e) { OWNER = false; }
      ONLINE = { db, user, uid: uid || null };
      if (OWNER && IN_COURSE) { const A = API(); if (A && A.S && A.S.loc && A.S.loc.v === 'home' && !active()) A.go({ v: 'home' }); }
      if (uid) syncLocks();
      return ONLINE;
    } catch (e) { return null; }
  })();
  let chain = Promise.resolve();
  function dbq(fn) { const p = chain.then(() => onlineP).then(o => (o && o.uid ? fn(o.db, o.uid) : Promise.reject({ code: 'no-db' }))); chain = p.catch(() => { }); return p; }
  function sendAttempt(r) {
    const body = JSON.parse(JSON.stringify(r)); delete body.online; delete body.name; delete body.cls;
    return dbq(async (db, uid) => {
      body.userId = uid;
      await db.doc('examlogs/' + seg(uid) + '/attempts/' + seg(r.attemptId)).set(body);
      await db.doc('examlogs/' + seg(uid)).set({ v: 1, lastAt: iso(), lastAttemptId: r.attemptId });
    }).then(() => 'sent', () => 'not sent online').then(s => { if (r.end) { const a = attemptById(r.attemptId); if (a) { a.online = s; saveAttempt(a); } paintOnline(r.attemptId, s); } return s; });
  }
  function sendLock(L) { return dbq((db, uid) => { const body = JSON.parse(JSON.stringify(L)); delete body.synced; delete body.name; delete body.cls; body.userId = uid; return db.doc('examlogs/' + seg(uid) + '/locks/' + seg(L.testId)).set(body); }).then(() => { const cur = getLock(L.testId); if (cur && cur.attemptId === L.attemptId) { cur.synced = true; putLock(cur); } }, () => { }); }
  function clearDbLock(testId) { return dbq((db, uid) => db.doc('examlogs/' + seg(uid) + '/locks/' + seg(testId)).delete()).catch(() => { }); }
  let lastSync = 0;
  function syncLocks() {
    if (Date.now() - lastSync < 15000) return; lastSync = Date.now();
    dbq(async (db, uid) => {
      const snap = await db.collection('examlogs/' + seg(uid) + '/locks').get();
      const remote = {}; snap.docs.forEach(d => { if (d.exists) remote[d.id] = d.data(); });
      let changed = false; const L = locks();
      Object.values(L).forEach(l => { if (l.synced && !remote[seg(l.testId)]) { unlockLocal(l, 'online'); changed = true; } });
      Object.values(remote).forEach(r => { if (r && r.testId && !L[r.testId]) { putLock(Object.assign({}, r, { synced: true })); changed = true; } });
      if (changed) refreshViews();
    }).catch(() => { });
  }
  function paintOnline(aid, s) { document.querySelectorAll('[data-ldx-online="' + aid + '"]').forEach(el => { el.textContent = s === 'sent' ? 'Sent to the online exam log.' : 'Not sent online (saved on this device only).'; }); Object.values(ports).forEach(p => p.send({ type: 'ldx:online', attemptId: aid, status: s })); }

  /* ---------------- styles ---------------- */
  const CSS = `
.ldx-scrim{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:16px;background:rgba(4,9,24,.82);overflow-y:auto}
.ldx-dlg{box-sizing:border-box;width:min(560px,100%);max-height:calc(100vh - 32px);overflow-y:auto;background:var(--ldx-bg,#FFFFFF);color:var(--ldx-ink,#0B1736);border-radius:16px;padding:22px 22px 18px;box-shadow:0 30px 80px -20px rgba(0,0,0,.7);font:16px/1.5 "Atkinson Hyperlegible",Verdana,"Segoe UI",system-ui,sans-serif;text-align:left}
.ldx-dlg:focus{outline:3px solid #E7B21E;outline-offset:2px}
.ldx-dlg h2{margin:0 0 6px;font:800 1.35rem/1.25 "Bricolage Grotesque","Segoe UI",system-ui,sans-serif;color:inherit}
.ldx-dlg p{margin:0 0 10px}.ldx-dlg ul{margin:0 0 12px;padding-left:20px}.ldx-dlg li{margin-bottom:5px}
.ldx-kick{display:inline-block;font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ldx-accent,#8A5A00);margin-bottom:4px}
.ldx-dlg label{display:block;font-weight:700;margin:8px 0 4px}
.ldx-dlg input[type=text]{box-sizing:border-box;width:100%;font:inherit;padding:10px 12px;border:2px solid var(--ldx-line,#C6CEE0);border-radius:10px;background:var(--ldx-field,#F6F8FC);color:inherit}
.ldx-dlg input[type=text]:focus{outline:3px solid #E7B21E;outline-offset:1px}
.ldx-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;align-items:center}
.ldx-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media (max-width:480px){.ldx-two{grid-template-columns:1fr}}
.ldx-btn{font:700 1rem/1.2 inherit;font-family:inherit;padding:12px 18px;border-radius:999px;border:2px solid transparent;cursor:pointer;background:#0E1F55;color:#FFFFFF;min-height:44px}
.ldx-btn.ghost{background:transparent;color:inherit;border-color:var(--ldx-line,#C6CEE0)}
.ldx-btn.warn{background:#B3261E}
.ldx-btn:focus-visible{outline:3px solid #E7B21E;outline-offset:2px}
.ldx-msg{min-height:1.4em;font-weight:700;color:#B3261E;margin:8px 0 0}
.ldx-ok{color:#1E7A45}
.ldx-big{font:800 1.6rem/1.2 ui-monospace,Consolas,monospace;letter-spacing:.12em}
.ldx-note{font-size:.88rem;color:inherit;opacity:.85}
.ldx-dlg details{margin-top:10px}.ldx-dlg summary{cursor:pointer;font-weight:700}
.ldx-bar{position:fixed;left:50%;top:8px;transform:translateX(-50%);z-index:2147482000;background:#0E1F55;color:#FFFFFF;border:2px solid #E7B21E;border-radius:999px;padding:6px 14px;font:700 .9rem/1.3 system-ui,sans-serif;max-width:calc(100% - 32px);box-sizing:border-box;text-align:center;box-shadow:0 8px 24px -10px rgba(0,0,0,.6)}
.ldx-toast{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:2147482500;background:#0B1736;color:#FFFFFF;padding:10px 18px;border-radius:999px;font:700 .95rem/1.3 system-ui,sans-serif;max-width:calc(100% - 32px);text-align:center}
.ldx-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
html[data-ldxmode="on"] #side,html[data-ldxmode="on"] #scrim,html[data-ldxmode="on"] #menuBtn,html[data-ldxmode="on"] .top-in>*,html[data-ldxmode="on"] .mu-mini,html[data-ldxmode="on"] #wb-fab,html[data-ldxmode="on"] .foot{display:none!important}
html[data-ldxmode="on"] .shell{grid-template-columns:minmax(0,1fr)!important}
html[data-ldxmode="on"] body{padding-top:44px}
html[data-ldxmode="on"] body *:not(input):not(textarea):not([contenteditable="true"]){-webkit-user-select:none;user-select:none}
@media print{html[data-ldxmode="on"] body>*{display:none!important}html[data-ldxmode="on"] body::before{content:"Printing is switched off during a lockdown exam.";display:block;font:700 18pt sans-serif;padding:40px}}
@media (prefers-color-scheme: dark){.ldx-dlg{--ldx-bg:#101A3A;--ldx-ink:#F1F4FF;--ldx-line:#3A4A7A;--ldx-field:#0A1230;--ldx-muted:#AEB9DD;--ldx-accent:#F5C542}.ldx-dlg .ldx-msg{color:#FF9B8F}.ldx-dlg .ldx-ok{color:#6EE0A0}}
@media (prefers-reduced-motion: no-preference){.ldx-scrim{animation:ldxIn .18s ease-out}@keyframes ldxIn{from{opacity:0}to{opacity:1}}}
.ldx-rep{border:2px solid #C6CEE0;border-radius:14px;padding:14px 16px;margin:0 0 16px;background:#FFFFFF;color:#0B1736;font:15px/1.45 "Atkinson Hyperlegible",Verdana,system-ui,sans-serif;break-inside:avoid}
.ldx-rep h3{margin:0 0 6px;font:800 1.15rem/1.3 "Bricolage Grotesque","Segoe UI",system-ui,sans-serif;color:#0B1736}
.ldx-rep .ldx-st{display:inline-block;padding:2px 10px;border-radius:999px;font-weight:800;font-size:.85rem}
.ldx-rep .ldx-clean{background:#DFF3E7;color:#14532D}.ldx-rep .ldx-flag{background:#FADCD6;color:#7F1D1D}
.ldx-rep dl{display:grid;grid-template-columns:max-content 1fr;gap:3px 14px;margin:8px 0}.ldx-rep dt{font-weight:700}.ldx-rep dd{margin:0}
.ldx-rep table{width:100%;border-collapse:collapse;font-size:.9rem;margin-top:6px}.ldx-rep th,.ldx-rep td{text-align:left;padding:4px 6px;border-bottom:1px solid #E1E6F0;vertical-align:top;color:#0B1736;background:transparent;opacity:1}
.ldx-rep dt,.ldx-rep dd,.ldx-rep p{color:#0B1736}
.ldx-rep .ldx-lockn{margin-top:8px;padding:8px 10px;border-radius:10px;background:#FFF2C9;color:#5A3B00;font-weight:700}
.ldx-tw{overflow-x:auto}
`;
  function addCSS(doc) { if (doc.getElementById('ldx-css')) return; const s = doc.createElement('style'); s.id = 'ldx-css'; s.textContent = CSS; (doc.head || doc.documentElement).appendChild(s); }
  addCSS(document);

  /* ---------------- dialogs (focus-trapped, aria-live) ---------------- */
  let DLG = null;
  function openDialog(inner, o) {
    closeDialog(); o = o || {};
    const sc = document.createElement('div'); sc.className = 'ldx-scrim';
    sc.innerHTML = `<div class="ldx-dlg" role="${o.alert ? 'alertdialog' : 'dialog'}" aria-modal="true" aria-labelledby="ldx-dt" aria-describedby="ldx-dd" tabindex="-1">${inner}</div>`;
    const others = Array.from(document.body.children).filter(x => !x.hasAttribute('inert') && !x.classList.contains('ldx-bar'));
    document.body.appendChild(sc); others.forEach(x => x.setAttribute('inert', ''));
    const dlg = sc.firstChild, prev = document.activeElement;
    const focusables = () => Array.from(dlg.querySelectorAll('button,input,select,textarea,a[href],summary,[tabindex]:not([tabindex="-1"])')).filter(x => !x.disabled && x.getClientRects().length);
    dlg.addEventListener('keydown', e => {
      if (e.key === 'Tab') { const f = focusables(); if (!f.length) { e.preventDefault(); return; } const a = f[0], z = f[f.length - 1]; if (e.shiftKey && (document.activeElement === a || document.activeElement === dlg)) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
      else if (e.key === 'Escape') { e.preventDefault(); if (o.onEsc) o.onEsc(); }
    });
    const fin = e => { if (!sc.contains(e.target)) { const f = dlg.querySelector('[data-autofocus]') || dlg; try { f.focus(); } catch (x) { } } };
    document.addEventListener('focusin', fin, true);
    const D = { sc, dlg, kind: o.kind || '', close() { document.removeEventListener('focusin', fin, true); others.forEach(x => x.removeAttribute('inert')); sc.remove(); if (DLG === D) DLG = null; if (!o.noRestore) { try { prev && prev.focus && prev.focus(); } catch (x) { } } }, live(t, ok) { const l = dlg.querySelector('.ldx-live'); if (l) { l.textContent = t; l.classList.toggle('ldx-ok', !!ok); } } };
    DLG = D;
    setTimeout(() => { const f = dlg.querySelector('[data-autofocus]') || dlg; try { f.focus(); } catch (x) { } if (o.say) D.live(o.say); }, 40);
    return D;
  }
  function closeDialog() { if (DLG) DLG.close(); }
  let toastT;
  function toast(m) {
    const A = API(); if (IN_COURSE && A && A.toast && !DLG) { A.toast(m); return; }
    let t = document.getElementById('ldx-toast'); if (!t) { t = document.createElement('div'); t.id = 'ldx-toast'; t.className = 'ldx-toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3200);
  }

  /* ---------------- formatting ---------------- */
  const tm = t => { try { return new Date(t).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); } catch (e) { return t; } };
  const dt = t => { try { return new Date(t).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }); } catch (e) { return t; } };
  const dur = ms => { const s = Math.round((ms || 0) / 1000); return Math.floor(s / 60) + ' min ' + String(s % 60).padStart(2, '0') + ' s'; };
  const KIND = { 'fullscreen-exit': 'left full screen', 'tab-hidden': 'switched tab, app or minimised', 'blur': 'clicked or switched away from the window', 'left-page': 'left or reloaded the page' };
  function evLabel(e) {
    const d = String(e.detail || ''), k = d.split(' ')[0];
    switch (e.type) {
      case 'start': return 'Exam started' + (d ? ' (' + d + ')' : '');
      case 'fullscreen': return 'Entered full screen';
      case 'fullscreen-unavailable': return 'Full screen not available on this device';
      case 'violation': return 'Violation: ' + (KIND[k] || k) + (d.includes(' ') ? ' (' + d.split(' ').slice(1).join(' ') + ')' : '');
      case 'signal': return 'Also detected: ' + (KIND[k] || k);
      case 'return': return 'Returned to the exam';
      case 'blocked': return 'Blocked: ' + d;
      case 'warning': return 'Violation limit reached (warning only)';
      case 'autosubmit': return 'Auto-submitted' + (d ? ' (' + d + ')' : '');
      case 'submit': return 'Submitted';
      case 'lockout': return 'Test locked: see your teacher';
      case 'unlock': return d === 'online' ? 'Unlocked by the teacher (online log)' : 'Unlocked with a teacher unlock code';
      case 'code': return 'Class exam code applied';
      default: return e.type + (d ? ': ' + d : '');
    }
  }
  function eventsTable(evs) { return `<div class="ldx-tw"><table><thead><tr><th scope="col">Time</th><th scope="col">Event</th></tr></thead><tbody>${(evs || []).map(e => `<tr><td>${esc(tm(e.t))}</td><td>${esc(evLabel(e))}</td></tr>`).join('')}</tbody></table></div>`; }
  function reportHTML(r) {
    const flagged = r.status === 'flagged';
    return `<section class="ldx-rep" aria-label="Exam integrity report"><h3>Exam integrity report</h3>
      <p><span class="ldx-st ${flagged ? 'ldx-flag' : 'ldx-clean'}">Status: ${flagged ? 'Flagged' : 'Clean'}</span></p>
      <dl><dt>Test</dt><dd>${esc(r.title)}</dd><dt>Student</dt><dd>${esc(r.name || '(not given)')}${r.cls ? ' · ' + esc(r.cls) : ''}</dd><dt>Attempt id</dt><dd>${esc(r.attemptId)}</dd>
      <dt>Started</dt><dd>${esc(dt(r.start))}</dd><dt>Ended</dt><dd>${esc(r.end ? dt(r.end) : 'still running')}</dd>
      <dt>Time out of the window</dt><dd>${esc(dur(r.outMs))}</dd><dt>Violations</dt><dd>${r.violations}${r.limit ? ' of ' + r.limit : ' (warning only)'}${r.blocked ? ' · ' + r.blocked + ' blocked action' + (r.blocked === 1 ? '' : 's') : ''}</dd>
      ${r.score ? `<dt>Score</dt><dd>${r.score.right}/${r.score.total} (${r.score.pct}%)</dd>` : ''}
      <dt>Online log</dt><dd data-ldx-online="${esc(r.attemptId)}">${r.online === 'sent' ? 'Sent to the online exam log.' : r.online === 'not sent online' ? 'Not sent online (saved on this device only).' : 'Checking…'}</dd></dl>
      ${eventsTable(r.events)}
      ${r.locked ? `<p class="ldx-lockn">This test is now locked. You cannot retake it until your teacher unlocks it.</p>` : ''}</section>`;
  }
  function reportText(r) {
    return ['EXAM INTEGRITY REPORT', 'Status: ' + (r.status === 'flagged' ? 'Flagged' : 'Clean'), 'Test: ' + r.title, 'Student: ' + (r.name || '(not given)') + (r.cls ? ' · ' + r.cls : ''), 'Attempt id: ' + r.attemptId, 'Started: ' + dt(r.start), 'Ended: ' + (r.end ? dt(r.end) : ''), 'Time out of the window: ' + dur(r.outMs), 'Violations: ' + r.violations + (r.limit ? ' of ' + r.limit : ' (warning only)') + ', blocked actions: ' + r.blocked, r.score ? 'Score: ' + r.score.right + '/' + r.score.total + ' (' + r.score.pct + '%)' : '', 'Events:'].concat((r.events || []).map(e => '  ' + tm(e.t) + '  ' + evLabel(e))).concat(r.locked ? ['This test is now locked until the teacher unlocks it.'] : []).filter(Boolean).join('\n');
  }
  function lockBody(L) {
    const r = attemptById(L.attemptId);
    return `<span class="ldx-kick">Locked</span><h2 id="ldx-dt">Locked: see your teacher</h2>
      <p id="ldx-dd"><b>${esc(L.title)}</b> was submitted automatically after too many violations, and it is locked. You cannot restart or retake it until your teacher unlocks it.</p>
      <p>Show your teacher this attempt id:</p><p class="ldx-big">${esc(L.attemptId)}</p>
      <p class="ldx-note">Locked ${esc(dt(L.lockedAt))}.</p>
      <details${r ? '' : ' open'}><summary>Violation log</summary>${eventsTable(L.events || (r && r.events))}</details>
      <label for="ldx-ucode">Teacher unlock code</label><input type="text" id="ldx-ucode" autocomplete="off" spellcheck="false" maxlength="10" inputmode="text">
      <p class="ldx-msg ldx-live" role="status" aria-live="assertive"></p>`;
  }

  /* ---------------- the session ---------------- */
  let sess = null; const ports = {}; let portN = 0;
  const active = () => !!(sess && sess.phase === 'active');
  const isFS = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  function log(type, detail) { if (!sess) return; sess.events.push({ t: iso(), type, detail: detail == null ? '' : String(detail) }); if (sess.phase === 'active') lsSet(LSK.live, pub(sess)); }
  function pub(s) { const r = {}; ['v', 'attemptId', 'testId', 'type', 'title', 'name', 'cls', 'userId', 'start', 'end', 'outMs', 'violations', 'limit', 'blocked', 'status', 'autoSubmitted', 'abandoned', 'locked', 'score', 'online', 'events'].forEach(k => { r[k] = s[k] === undefined ? null : s[k]; }); r.events = (s.events || []).slice(); return r; }
  function requestFS() {
    const el = document.documentElement, f = el.requestFullscreen || el.webkitRequestFullscreen;
    if (!f) return Promise.resolve(false);
    try { return Promise.resolve(f.call(el)).then(() => true, () => false); } catch (e) { return Promise.resolve(false); }
  }
  function bar() {
    let b = document.getElementById('ldx-bar');
    if (!active()) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('div'); b.id = 'ldx-bar'; b.className = 'ldx-bar'; b.setAttribute('role', 'status'); document.body.appendChild(b); }
    b.textContent = '🔒 Lockdown exam mode · ' + sess.title + ' · ' + (sess.limit ? 'violations ' + sess.violations + ' of ' + sess.limit : sess.violations + ' violation' + (sess.violations === 1 ? '' : 's') + ' recorded');
  }
  function setChrome(on) { if (on) document.documentElement.dataset.ldxmode = 'on'; else delete document.documentElement.dataset.ldxmode; bar(); }

  function gate(ctx, port) {
    return new Promise(res => {
      const cfg = settings();
      const A = API(), S0 = (A && A.S) || lsGet('capeDM1.v1') || {};
      const nm = ctx.name || S0.name || '', cl = ctx.cls || ((S0.profile || {}).year) || '';
      const lim = cfg.limit;
      const D = openDialog(`<span class="ldx-kick">Lockdown exam mode</span><h2 id="ldx-dt">${esc(ctx.title)}</h2>
        <div id="ldx-dd"><p>This is a graded test. Read the rules, then start.</p><ul>
        <li>The test opens in <b>full screen</b>. Stay in this window until you submit.</li>
        <li>Leaving full screen, switching tab or app, minimising, or clicking outside the window is <b>recorded</b> with the time.${lim ? ` After <b>${lim}</b> times your work is <b>submitted automatically</b> and the test is <b>locked</b> until your teacher unlocks it.` : ' You will be warned each time.'}</li>
        <li>Copy, cut,${cfg.paste ? ' paste,' : ''} select all, printing, right-click and drag and drop are switched off.</li>
        <li>The course menu, navigation and the arcade are switched off until you submit.</li>
        <li>Your teacher receives an <b>exam integrity report</b> with every event and its time.</li></ul></div>
        <div class="ldx-two"><div><label for="ldx-name">Name</label><input type="text" id="ldx-name" autocomplete="name" maxlength="60" value="${esc(nm)}" ${nm ? '' : 'data-autofocus'}></div>
        <div><label for="ldx-cls">Class</label><input type="text" id="ldx-cls" maxlength="30" value="${esc(cl)}"></div></div>
        <details><summary>I have a class exam code</summary><label for="ldx-code">Class exam code from your teacher</label><input type="text" id="ldx-code" autocomplete="off" spellcheck="false" maxlength="12"><div class="ldx-row"><button type="button" class="ldx-btn ghost" data-ldxd="code">Apply code</button></div></details>
        <p class="ldx-note">Settings: ${esc(cfg.src)}.</p>
        <p class="ldx-msg ldx-live" role="status" aria-live="assertive"></p>
        <div class="ldx-row"><button type="button" class="ldx-btn" data-ldxd="agree" ${nm ? 'data-autofocus' : ''}>I agree, start in full screen</button><button type="button" class="ldx-btn ghost" data-ldxd="cancel">Not now</button></div>`, { kind: 'gate', onEsc: () => done({ ok: false, cancelled: true }) });
      let fin = false;
      function done(r) { if (fin) return; fin = true; D.close(); res(r); }
      D.dlg.addEventListener('click', e => {
        const b = e.target.closest('[data-ldxd]'); if (!b) return;
        const a = b.dataset.ldxd;
        if (a === 'cancel') return done({ ok: false, cancelled: true });
        if (a === 'code') {
          const v = D.dlg.querySelector('#ldx-code').value; const c = checkCfgCode(v);
          if (!c) { D.live('That code is not valid. Check it with your teacher.'); return; }
          lsSet(LSK.code, c.code); D.live('Code applied.', true);
          if (!c.types[ctx.type] || c.adjust) return done({ ok: true, off: true, adjust: c.adjust, code: true });
          done({ ok: false, again: true }); return;
        }
        if (a === 'agree') {
          const name = D.dlg.querySelector('#ldx-name').value.trim(), cls = D.dlg.querySelector('#ldx-cls').value.trim();
          if (!name) { D.live('Type your name to start.'); D.dlg.querySelector('#ldx-name').focus(); return; }
          const fsP = requestFS(); // inside the click, so the browser treats it as a user gesture
          const cfg2 = settings();
          sess = { v: 1, attemptId: newId(), testId: ctx.testId, type: ctx.type, title: ctx.title, name, cls, userId: ONLINE && ONLINE.uid || null, start: iso(), end: null, outMs: 0, violations: 0, limit: cfg2.limit, blocked: 0, status: 'in-progress', autoSubmitted: false, abandoned: false, locked: false, score: null, online: 'pending', events: [], phase: 'active', paste: cfg2.paste, port, awaySince: null, fs: false };
          log('start', cfg2.src);
          if (lsGet(LSK.code)) log('code', lsGet(LSK.code));
          setChrome(true);
          sendAttempt(pub(sess));
          fsP.then(ok => { if (!sess || sess.attemptId == null) return; if (ok && isFS()) { sess.fs = true; log('fullscreen'); } else log('fullscreen-unavailable'); });
          port.send({ type: 'ldx:state', active: true, paste: cfg2.paste });
          done({ ok: true, attemptId: sess.attemptId, name, cls, paste: cfg2.paste });
          if (port.frame) setTimeout(() => { try { port.frame.focus(); } catch (x) { } }, 60);
        }
      });
    });
  }
  async function begin(ctx, port) {
    for (let guard = 0; guard < 4; guard++) {
      const cfg = settings();
      if (!cfg.types[ctx.type]) return { ok: true, off: true };
      if (cfg.adjust) return { ok: true, off: true, adjust: true };
      const L = getLock(ctx.testId); if (L) { if (port.kind !== 'course') showLock(L); return { ok: false, locked: true, attemptId: L.attemptId }; }
      if (active()) return { ok: false, busy: true };
      const r = await gate(ctx, port);
      if (!r.again) return r;
    }
    return { ok: false, cancelled: true };
  }

  /* violations */
  function violation(kind) {
    if (!active()) return;
    if (sess.awaySince != null || sess.ending) { log('signal', kind); return; }
    sess.violations++; sess.awaySince = Date.now();
    log('violation', kind + ' ' + sess.violations + '/' + (sess.limit || '∞'));
    bar();
    const lim = sess.limit, hit = lim && sess.violations >= lim;
    if (hit) { autoSubmit(); return; }
    if (!lim && sess.violations === 3) log('warning');
    const n = lim ? ` (${sess.violations} of ${lim})` : ` (${sess.violations} recorded)`;
    const D = openDialog(`<span class="ldx-kick">Lockdown exam mode</span><h2 id="ldx-dt">You left the exam window</h2>
      <p id="ldx-dd" class="ldx-live" role="status" aria-live="assertive">You left the exam window. This has been recorded${esc(n)}.</p>
      ${lim ? `<p>${lim - sess.violations === 1 ? 'One more time and your test is submitted automatically and locked.' : 'After ' + lim + ' times your test is submitted automatically and locked.'}</p>` : '<p>Your teacher will see every time you leave in your integrity report.</p>'}
      <div class="ldx-row"><button type="button" class="ldx-btn" data-ldxd="return" data-autofocus>Return to full screen</button></div>`, { kind: 'away', alert: true, noRestore: true });
    D.dlg.addEventListener('click', e => { if (!e.target.closest('[data-ldxd="return"]')) return; if (sess && sess.fs) requestFS(); back(); D.close(); if (sess && sess.port && sess.port.frame) { try { sess.port.frame.focus(); } catch (x) { } } });
  }
  function back() { if (!sess || sess.awaySince == null) return; sess.outMs += Date.now() - sess.awaySince; sess.awaySince = null; log('return'); bar(); }
  function blocked(what) { if (!active()) return; sess.blocked++; log('blocked', what); toast(what[0].toUpperCase() + what.slice(1) + ' is switched off during the exam. This has been recorded.'); }
  function autoSubmit() {
    if (!active() || sess.ending) return; sess.ending = true;
    log('autosubmit', 'limit of ' + sess.limit + ' reached'); sess.autoSubmitted = true;
    const s = sess, p = s.port;
    openDialog(`<span class="ldx-kick">Lockdown exam mode</span><h2 id="ldx-dt">Your test has been submitted</h2>
      <p id="ldx-dd" class="ldx-live" role="status" aria-live="assertive">You left the exam window ${s.violations} times. Your work has been submitted automatically and this test is now locked. See your teacher.</p>
      <div class="ldx-row"><button type="button" class="ldx-btn" data-ldxd="see" data-autofocus>See my result</button></div>`, { kind: 'auto', alert: true, noRestore: true }).dlg.addEventListener('click', e => { if (e.target.closest('[data-ldxd="see"]')) closeDialog(); });
    try { p.forceSubmit ? p.forceSubmit() : p.send({ type: 'ldx:force-submit' }); } catch (e) { }
    setTimeout(() => { if (sess === s && s.phase === 'active') finish({}); }, 4000);
  }
  function finish(o) {
    if (!active()) return null;
    o = o || {}; const s = sess;
    if (s.awaySince != null) { s.outMs += Date.now() - s.awaySince; s.awaySince = null; }
    if (o.score) s.score = o.score;
    if (!s.autoSubmitted) log('submit');
    s.end = iso(); s.phase = 'done';
    if (s.autoSubmitted && s.limit) { s.locked = true; log('lockout'); }
    s.status = (s.violations || s.blocked || s.abandoned) ? 'flagged' : 'clean';
    const r = pub(s); r.online = 'pending';
    saveAttempt(r); lsSet(LSK.live, null);
    if (r.locked) { const L = { v: 1, testId: r.testId, attemptId: r.attemptId, title: r.title, type: r.type, lockedAt: s.end, userId: r.userId, events: r.events, synced: false }; putLock(L); sendLock(L); }
    sendAttempt(r);
    setChrome(false);
    if (DLG && DLG.kind === 'away') closeDialog();
    try { if (isFS()) (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) { }
    try { s.port.send({ type: 'ldx:state', active: false }); if (r.locked) s.port.send({ type: 'ldx:locks', locks: lockSummary() }); } catch (e) { }
    return r;
  }
  function unlockLocal(L, how) {
    putLock({ testId: L.testId, del: true });
    const a = attemptById(L.attemptId); if (a) { a.events.push({ t: iso(), type: 'unlock', detail: how }); a.locked = false; saveAttempt(a); sendAttempt(a); }
    else sendAttempt({ v: 1, attemptId: L.attemptId, testId: L.testId, type: L.type, title: L.title, start: L.lockedAt, end: L.lockedAt, outMs: 0, violations: 0, limit: 0, blocked: 0, status: 'flagged', locked: false, events: (L.events || []).concat([{ t: iso(), type: 'unlock', detail: how }]) });
    if (how === 'code') clearDbLock(L.testId);
  }
  function tryUnlock(testId, code) { const L = getLock(testId); if (!L) return true; if (!checkUnlock(L.attemptId, code)) return false; unlockLocal(L, 'code'); refreshViews(); return true; }
  function lockSummary() { const o = {}; Object.values(locks()).forEach(L => { o[L.testId] = { attemptId: L.attemptId, lockedAt: L.lockedAt, title: L.title }; }); return o; }
  function showLock(L) {
    const D = openDialog(lockBody(L) + `<div class="ldx-row"><button type="button" class="ldx-btn" data-ldxd="unlock">Unlock</button><button type="button" class="ldx-btn ghost" data-ldxd="close" data-autofocus>Close</button></div>`, { kind: 'lock', onEsc: () => D.close() });
    D.dlg.addEventListener('click', e => {
      const b = e.target.closest('[data-ldxd]'); if (!b) return;
      if (b.dataset.ldxd === 'close') return D.close();
      if (tryUnlock(L.testId, D.dlg.querySelector('#ldx-ucode').value)) { D.close(); toast('Unlocked. You can start the test again.'); }
      else D.live('That unlock code does not match this attempt.');
    });
    syncLocks();
  }
  function refreshViews() {
    Object.values(ports).forEach(p => p.send({ type: 'ldx:locks', locks: lockSummary() }));
    const A = API(); if (IN_COURSE && A && !active()) { try { A.render(); } catch (e) { } }
  }

  /* reload or close during an exam: record the abandoned attempt */
  (function () {
    const L = lsGet(LSK.live); if (!L || L.end) return; lsSet(LSK.live, null);
    L.abandoned = true; L.violations = (L.violations || 0) + 1; L.end = iso();
    L.events.push({ t: L.end, type: 'violation', detail: 'left-page ' + L.violations + '/' + (L.limit || '∞') });
    if (L.limit && L.violations >= L.limit) { L.locked = true; L.events.push({ t: iso(), type: 'lockout', detail: '' }); const K = { v: 1, testId: L.testId, attemptId: L.attemptId, title: L.title, type: L.type, lockedAt: L.end, userId: L.userId, events: L.events, synced: false }; putLock(K); sendLock(K); }
    L.status = 'flagged'; L.online = 'pending'; saveAttempt(L); sendAttempt(L);
  })();

  /* ---------------- guards on this document ---------------- */
  const inAns = t => !!(t && t.closest && t.closest('input:not([type=radio]):not([type=checkbox]),textarea,[contenteditable="true"]'));
  const inDlg = t => !!(t && t.closest && t.closest('.ldx-scrim'));
  function local() { return active() && (sess.port.kind === 'course' || sess.port.kind === 'local' || sess.port.kind === 'frame'); }
  document.addEventListener('keydown', e => {
    if (!local() || inDlg(e.target)) return;
    const k = (e.key || '').toLowerCase(), c = e.ctrlKey || e.metaKey;
    if (k === 'printscreen') { blocked('screenshot key'); return; }
    if (!c) return;
    const map = { c: 'copy', x: 'cut', v: 'paste', a: 'select-all', p: 'print', s: 'save', u: 'view source', f: '' };
    if (!(k in map) || !map[k]) return;
    if (k === 'a' && inAns(e.target)) return;
    if (k === 'v' && inAns(e.target) && !sess.paste) return;
    e.preventDefault(); e.stopPropagation(); blocked(map[k]);
  }, true);
  document.addEventListener('keyup', e => { if (local() && (e.key || '').toLowerCase() === 'printscreen') { try { navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(''); } catch (x) { } } }, true);
  ['copy', 'cut', 'paste'].forEach(ev => document.addEventListener(ev, e => {
    if (!local() || inDlg(e.target)) return;
    if (ev === 'paste' && inAns(e.target) && !sess.paste) return;
    e.preventDefault(); e.stopPropagation(); blocked(ev);
  }, true));
  document.addEventListener('selectstart', e => { if (local() && !inAns(e.target) && !inDlg(e.target)) e.preventDefault(); }, true);
  document.addEventListener('dragstart', e => { if (local() && !inDlg(e.target)) { e.preventDefault(); } }, true);
  document.addEventListener('drop', e => { if (local()) { e.preventDefault(); blocked('drag and drop'); } }, true);
  document.addEventListener('contextmenu', e => { if (local() && !inDlg(e.target)) { e.preventDefault(); blocked('right-click menu'); } }, true);
  window.addEventListener('beforeprint', () => { if (local()) blocked('print'); });
  window.addEventListener('beforeunload', e => { if (active()) { e.preventDefault(); e.returnValue = 'Your exam is still running. Leaving now is recorded.'; return e.returnValue; } });
  ['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, () => { if (active() && sess.fs && !isFS()) violation('fullscreen-exit'); }));
  document.addEventListener('visibilitychange', () => { if (active() && document.visibilityState === 'hidden') violation('tab-hidden'); });
  function checkFocus() { if (active() && !document.hasFocus()) violation('blur'); }
  window.addEventListener('blur', () => { if (active()) setTimeout(checkFocus, 250); });

  /* ---------------- ports: iframes (postMessage) and standalone pages ---------------- */
  function portFor(src) {
    for (const k in ports) if (ports[k].win === src) return ports[k];
    const fr = Array.from(document.querySelectorAll('iframe')).find(f => { try { return f.contentWindow === src; } catch (e) { return false; } });
    const id = 'f' + (++portN);
    return (ports[id] = { id, kind: 'frame', win: src, frame: fr || null, send(m) { try { src.postMessage(m, '*'); } catch (e) { } } });
  }
  function handle(d, port) {
    const reply = m => port.send(Object.assign({ reqId: d.reqId }, m));
    switch (d.type) {
      case 'ldx:hello': { const c = settings(); reply({ type: 'ldx:here', types: c.types, adjust: c.adjust, locks: lockSummary(), css: CSS }); return; }
      case 'ldx:begin': begin({ testId: String(d.testId || 'game'), type: String(d.kind || 'dmquiz1'), title: String(d.title || 'Test').slice(0, 120), name: d.name, cls: d.cls }, port).then(r => reply(Object.assign({ type: 'ldx:begun' }, r))); return;
      case 'ldx:end': { const r = (active() && sess.port === port) ? finish({ score: d.score }) : null; const rr = r || (d.attemptId && attemptById(d.attemptId)); reply({ type: 'ldx:ended', report: rr, html: rr ? reportHTML(rr) : '', text: rr ? reportText(rr) : '' }); return; }
      case 'ldx:event': if (active() && sess.port === port) blocked(String(d.detail || 'shortcut')); return;
      case 'ldx:blur': if (active()) setTimeout(checkFocus, 250); return;
      case 'ldx:showlock': { const L = getLock(String(d.testId)); if (L) showLock(L); reply({ type: 'ldx:shown', locked: !!L }); return; }
      case 'ldx:unlock': reply({ type: 'ldx:unlocked', ok: tryUnlock(String(d.testId), d.code) }); return;
      case 'ldx:locks': reply({ type: 'ldx:locks', locks: lockSummary() }); return;
    }
  }
  window.addEventListener('message', ev => { const d = ev.data; if (!d || typeof d.type !== 'string' || d.type.indexOf('ldx:') !== 0 || !ev.source || ev.source === window) return; if (/^ldx:(here|begun|ended|state|locks|force-submit|online|shown|unlocked)$/.test(d.type) && !d.reqId) return; handle(d, portFor(ev.source)); });
  function connectLocal(recv) { const id = 'l' + (++portN); const port = ports[id] = { id, kind: 'local', send(m) { setTimeout(() => recv(m), 0); } }; return d => handle(d, port); }

  /* ---------------- the course (engine hook) ---------------- */
  let lastT = null;
  function courseCtx(loc) {
    if (!loc) return null;
    if (loc.v === 'paper') { const P = (window.COURSE_PAPERS || []).find(p => p.id === loc.p); if (!P || P.kind !== 'p1') return null; const mock = /MOCK/.test(P.id); return { testId: (mock ? 'mock-' : 'p1-') + P.id, type: mock ? 'mock' : 'p1', title: P.title, items: P.items, timed: !!P.time }; }
    if (loc.v === 'test') { const m = (window.COURSE_MODULES || []).find(x => x.id === loc.m); if (!m || !m.test) return null; return { testId: 'mtest-' + m.id, type: 'mtest', title: m.test.title || (m.code + ' test'), items: m.test.items }; }
    return null;
  }
  const coursePort = { id: 'course', kind: 'course', send() { }, forceSubmit() { const T = lastT; if (T) T.lockForce = true; const b = document.querySelector('#stage [data-act="psubmit"], #stage [data-act="tsubmit"]'); if (b) b.click(); else finish({}); } };
  const crumbs = `<div class="crumbs"><button type="button" class="linkbtn" data-go="assess">← All assessments</button><span>Lockdown exam mode</span></div>`;
  function stage(h, loc, T) {
    lastT = T;
    const c = courseCtx(loc);
    if (!c) { if (DLG && DLG.kind === 'gate' && !active()) closeDialog(); return h; }
    const cfg = settings();
    if (!cfg.types[c.type]) return h;
    if (cfg.adjust) return h.replace(/^(<div class="crumbs">[\s\S]*?<\/div>)?/, m => m + `<div class="card"><p class="hint">🔓 Lockdown exam mode is off for you (reasonable adjustment set by your teacher).</p></div>`);
    const L = getLock(c.testId);
    if (L && !(T.ldx === L.attemptId && T.submitted)) { setTimeout(syncLocks, 0); return crumbs + `<div class="card ldx-lockcard">${lockBody(L).replace('id="ldx-dt"', 'id="ldx-lt"').replace('id="ldx-dd"', '').replace('id="ldx-ucode"', 'id="ldx-ucode" class="search"')}<div class="row"><button type="button" class="btn go" data-ldx="unlock" data-test="${esc(c.testId)}">Unlock</button><button type="button" class="btn ghost" data-go="assess">Back to all assessments</button></div></div>`; }
    const runnable = /data-act="(psubmit|tsubmit)"/.test(h);
    if (T.submitted) {
      if (active() && sess.testId === c.testId && T.ldx === sess.attemptId) { const right = c.items.filter((it, i) => T.ans[i] === it.answer).length; finish({ score: { right, total: c.items.length, pct: Math.round(right / c.items.length * 100) } }); }
      const r = T.ldx && attemptById(T.ldx);
      return r ? h.replace(/^(<div class="crumbs">[\s\S]*?<\/div>)?/, m => m + reportHTML(r)) : h;
    }
    if (active() && sess.testId === c.testId && T.ldx === sess.attemptId) return h;
    if (!runnable) return h;
    if (!T.ldxGate) { T.ldxGate = 1; setTimeout(() => openCourseGate(c, T), 30); }
    return crumbs + `<div class="card"><span class="kicker k-test">Lockdown exam mode · graded test</span><h2>${esc(c.title)}</h2><p class="lead">This test runs in lockdown exam mode. It opens in full screen, the course menu is switched off, and leaving the window is recorded${cfg.limit ? `. After ${cfg.limit} times your work is submitted and the test is locked until your teacher unlocks it` : ''}.</p><div class="row"><button type="button" class="btn go" data-ldx="gate">Open the start screen</button><button type="button" class="btn ghost" data-go="assess">Back to all assessments</button></div></div>`;
  }
  function openCourseGate(c, T) {
    if (active() || (DLG && DLG.kind === 'gate')) return;
    const A = API(); const loc0 = JSON.stringify(A.S.loc);
    begin(c, coursePort).then(r => {
      if (JSON.stringify(A.S.loc) !== loc0 || lastT !== T) { if (r.ok && !r.off && active()) { log('signal', 'left-page'); } return; }
      if (r.ok && r.attemptId) { T.ldx = r.attemptId; if (r.name && !A.S.name) { A.S.name = r.name; A.save(); } A.render(); if (c.timed) { const b = document.querySelector('#stage [data-act="tstart"]'); if (b) b.click(); } const q = document.querySelector('#stage .opt'); if (q) { try { q.focus({ preventScroll: true }); } catch (e) { } } }
      else if (r.ok && r.off) A.render();
      else if (r.locked) A.render();
    });
  }
  const ALLOW_ACT = ['tans', 'psubmit', 'tsubmit', 'speak', 'ttsrate', 'tstart'];
  document.addEventListener('click', e => {
    const t = e.target;
    if (IN_COURSE && active() && !inDlg(t)) {
      const g = t.closest('[data-go],[data-gx],[data-px],[data-ldx]'), a = t.closest('[data-act]');
      if (g || (a && !ALLOW_ACT.includes(a.dataset.act))) { e.preventDefault(); e.stopImmediatePropagation(); toast('Navigation is switched off until you submit the test.'); return; }
    }
    const b = t.closest('[data-ldx]'); if (!b) return;
    const act = b.dataset.ldx;
    if (act === 'gate') { const A = API(); if (A) { const c = courseCtx(A.S.loc); if (c && lastT) openCourseGate(c, lastT); } }
    else if (act === 'unlock') { const card = b.closest('.ldx-lockcard'), inp = card && card.querySelector('#ldx-ucode'), msg = card && card.querySelector('.ldx-live'); if (tryUnlock(b.dataset.test, inp ? inp.value : '')) toast('Unlocked. You can start the test again.'); else if (msg) msg.textContent = 'That unlock code does not match this attempt.'; }
    else if (act === 'ounlock') ownerUnlock(b);
  });

  /* ---------------- Teacher Edition: Lockdown settings ---------------- */
  const LIMIT_LABEL = l => l ? l + ' violations, then auto-submit and lock' : 'Warn only (never auto-submit)';
  function teacherCfg() { const c = lsGet(LSK.teacher); const d = c && checkCfgCode(c); return d || JSON.parse(JSON.stringify(DEFAULTS)); }
  function setHTML(api) {
    const c = teacherCfg(), key = !!KEY();
    const code = key ? cfgCodeFor(Object.assign({}, c, { adjust: false })) : null, adj = key ? cfgCodeFor(Object.assign({}, c, { adjust: true })) : null;
    const hist = history().slice(-12).reverse();
    let h = `<section class="hero"><span class="eyebrow">Teacher Edition · Assessments</span><h1>Lockdown settings</h1><p>Lockdown exam mode for graded tests: Paper 01 past papers, mocks, module tests, the Paper 02 bank exam mode, Digital Media Test 1 and Class Quiz 1. Practice activities and lesson screens are never locked.</p></section>`;
    h += `<div class="card"><h2>What this mode can and cannot do</h2><p>A web page cannot truly lock a device. It cannot stop Alt-Tab, a second device or phone, or screenshots. This mode is <b>lockdown-style</b>: it deters, detects and logs. It opens the test in full screen, switches off copy, paste, printing and the course menu, records every time a student leaves the window, and after the limit it submits the work and locks the test until you unlock it.</p>
      <div class="tip"><b>Teacher note.</b> For high-stakes tests, combine this mode with supervision in the room. Or use a real lockdown browser: <a href="https://safeexambrowser.org" target="_blank" rel="noopener">Safe Exam Browser</a> (free and open source), or Respondus LockDown Browser (paid, used through an LMS).</div>
      <p class="hint">Other limits: a student can clear the browser's site data to remove a lock on that device (the online log still shows the lockout), the full-screen request is refused on some devices such as iPhones, and settings saved here apply only to this device. Use a class exam code for students' devices.</p></div>`;
    h += `<div class="card"><h2>Settings</h2><fieldset style="border:0;padding:0;margin:0"><legend><b>Lockdown on for</b></legend>${TYPES.map(([t, n]) => `<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" data-ldxs="type" value="${t}" ${c.types[t] ? 'checked' : ''}> ${esc(n)}</label>`).join('')}</fieldset>
      <label for="ldx-lim" style="display:block;font-weight:700;margin-top:12px">Violation limit</label><select id="ldx-lim" class="select" data-ldxs="limit">${[3, 2, 5, 0].map(l => `<option value="${l}" ${c.limit === l ? 'selected' : ''}>${esc(LIMIT_LABEL(l))}${l === 3 ? ' (default)' : ''}</option>`).join('')}</select>
      <label style="display:flex;gap:8px;align-items:center;margin:12px 0 6px"><input type="checkbox" data-ldxs="paste" ${c.paste ? 'checked' : ''}> Block paste in answer boxes</label>
      <label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" data-ldxs="adjust" ${c.adjust ? 'checked' : ''}> Reasonable adjustment: lockdown off on this device (for students with access arrangements)</label>
      <div class="row"><button type="button" class="btn go" data-px="ldx-save">Save on this device</button><button type="button" class="btn ghost" data-px="ldx-reset">Back to the defaults</button></div>
      <p class="hint">Student course defaults (built into the page): lockdown on for every graded test, limit 3, paste blocked. Settings saved here apply to this device only.</p></div>`;
    h += `<div class="card"><h2>Class exam codes</h2>${key ? `<p>Students type a code on the lockdown start screen. It applies these settings on their device until they type another code.</p>
      <p><b>Class exam code</b> (for everyone): <span class="ldx-big" id="ldx-ccode">${esc(code)}</span></p>
      <p><b>Reasonable adjustment code</b> (lockdown off; give it only to students with access arrangements): <span class="ldx-big" id="ldx-acode">${esc(adj)}</span></p>
      <p class="hint">The codes update when you change the settings above. The start screen also accepts the code a student already has.</p>` : `<p class="fb bad">The teacher key file (tools/lockdown-key.js) did not load, so codes cannot be made on this page.</p>`}</div>`;
    h += `<div class="card"><h2>Unlock a student</h2><p>Type the attempt id shown on the student's "Locked: see your teacher" screen. Read the unlock code to the student, who types it on that screen.</p>
      <label for="ldx-aid"><b>Attempt id</b></label><div class="row"><input id="ldx-aid" class="search" style="flex:1 1 200px;text-transform:uppercase" maxlength="12" autocomplete="off" placeholder="for example 7KQ2-M9XA"><button type="button" class="btn go" data-px="ldx-ucode">Get the unlock code</button></div>
      <p class="ldx-big" id="ldx-uout" aria-live="polite"></p><p class="hint">In the online course you can also press Unlock in the Exam integrity log, which clears the lock on every device the student signs in on.</p></div>`;
    h += `<div class="card"><h2>Attempts on this device</h2>${hist.length ? `<div class="tablewrap"><table><thead><tr><th>Test</th><th>Student</th><th>Start</th><th>Status</th><th>Attempt</th></tr></thead><tbody>${hist.map(r => `<tr><td>${esc(r.title)}</td><td>${esc(r.name || '')}</td><td>${esc(dt(r.start))}</td><td>${r.status === 'flagged' ? 'Flagged' : r.status === 'clean' ? 'Clean' : esc(r.status)}${r.locked ? ' · locked' : ''}</td><td>${esc(r.attemptId)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="hint">No lockdown attempts on this device yet.</p>'}</div>`;
    return h;
  }
  function readForm(root) { const c = { types: {}, limit: 3, paste: false, adjust: false }; root.querySelectorAll('[data-ldxs="type"]').forEach(x => { c.types[x.value] = x.checked; }); const l = root.querySelector('[data-ldxs="limit"]'); c.limit = l ? +l.value : 3; const p = root.querySelector('[data-ldxs="paste"]'); c.paste = !!(p && p.checked); const a = root.querySelector('[data-ldxs="adjust"]'); c.adjust = !!(a && a.checked); return c; }

  /* ---------------- owner-only: Exam integrity log ---------------- */
  let LOGDATA = null;
  async function loadLog() {
    const o = await onlineP; if (!o || !OWNER) return null;
    const users = await o.db.collection('examlogs').get();
    const out = [];
    for (const u of users.docs) {
      const uid = u.id;
      const [at, lk] = await Promise.all([o.db.collection('examlogs/' + uid + '/attempts').get(), o.db.collection('examlogs/' + uid + '/locks').get()]);
      const lockMap = {}; lk.docs.forEach(d => { if (d.exists) lockMap[d.id] = d.data(); });
      at.docs.forEach(d => { if (d.exists) out.push(Object.assign({ uid, lockedNow: !!lockMap[seg((d.data() || {}).testId || '')] && lockMap[seg(d.data().testId)].attemptId === d.data().attemptId }, d.data())); });
      Object.values(lockMap).forEach(L => { if (!out.some(r => r.uid === uid && r.attemptId === L.attemptId)) out.push(Object.assign({ uid, lockedNow: true, status: 'flagged', start: L.lockedAt, end: L.lockedAt, violations: (L.events || []).filter(e => e.type === 'violation').length, events: L.events || [] }, L)); });
    }
    out.sort((a, b) => String(b.start).localeCompare(String(a.start)));
    let names = {}; try { names = await o.user.profiles(Array.from(new Set(out.map(r => r.uid)))); } catch (e) { }
    return { rows: out, names };
  }
  function logHTML() {
    let h = `<section class="hero"><span class="eyebrow">Owner only</span><h1>Exam integrity log</h1><p>Every lockdown attempt sent from students' devices, with times, violations and flags. Press Unlock to clear a student's lock.</p></section>`;
    if (!LOGDATA) return h + `<div class="card" id="ldx-logbox"><p>Loading the log…</p></div>`;
    const { rows, names } = LOGDATA;
    if (!rows.length) return h + `<div class="card" id="ldx-logbox"><p>No attempts have been sent yet. Students need Contributor access (or above) for their attempts to reach this log.</p></div>`;
    return h + `<div class="card" id="ldx-logbox"><div class="tablewrap"><table><thead><tr><th scope="col">Student</th><th scope="col">Test</th><th scope="col">Start</th><th scope="col">End</th><th scope="col">Out of window</th><th scope="col">Violations</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody>${rows.map(r => {
      const p = names[r.uid] || {}; const who = p.name || 'Someone';
      return `<tr><td>${esc(who)}${r.name && r.name !== who ? `<br><span class="hint">typed: ${esc(r.name)}${r.cls ? ' · ' + esc(r.cls) : ''}</span>` : ''}</td><td>${esc(r.title)}<br><span class="hint">${esc(r.attemptId)}</span></td><td>${esc(dt(r.start))}</td><td>${esc(r.end ? dt(r.end) : 'in progress')}</td><td>${esc(dur(r.outMs))}</td><td>${r.violations || 0}${r.limit ? ' of ' + r.limit : ''}${r.blocked ? '<br><span class="hint">' + r.blocked + ' blocked</span>' : ''}</td><td>${r.status === 'clean' ? 'Clean' : r.status === 'flagged' ? '<b>Flagged</b>' : esc(r.status || '')}${r.autoSubmitted ? '<br>auto-submitted' : ''}${r.abandoned ? '<br>left the page' : ''}${r.lockedNow ? '<br><b>Locked</b>' : ''}</td><td>${r.lockedNow ? `<button type="button" class="btn go" data-ldx="ounlock" data-uid="${esc(r.uid)}" data-test="${esc(r.testId)}" data-aid="${esc(r.attemptId)}">Unlock</button>` : ''}<details><summary>Events</summary>${eventsTable(r.events)}</details></td></tr>`;
    }).join('')}</tbody></table></div><p class="hint">Names come from each student's account. "Typed" shows the name entered on the start screen when it differs.</p></div>`;
  }
  async function ownerUnlock(b) {
    const o = await onlineP; if (!o || !OWNER) return;
    const uid = b.dataset.uid, tid = b.dataset.test, aid = b.dataset.aid; b.disabled = true;
    try {
      await o.db.doc('examlogs/' + seg(uid) + '/locks/' + seg(tid)).delete();
      const ref = o.db.doc('examlogs/' + seg(uid) + '/attempts/' + seg(aid)); const s = await ref.get();
      if (s.exists) { const d = JSON.parse(JSON.stringify(s.data())); d.events = (d.events || []).concat([{ t: iso(), type: 'unlock', detail: 'online' }]); d.locked = false; await ref.set(d); }
      toast('Unlocked. The student can retake the test the next time they open it.');
    } catch (e) { toast('Could not unlock: ' + (e && e.code || 'error')); }
    LOGDATA = await loadLog().catch(() => LOGDATA); const A = API(); if (A && A.S.loc.v === 'ldxlog') A.render();
  }

  /* ---------------- register course views ---------------- */
  if (IN_COURSE) {
    const P = (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []);
    P.push({
      view: 'ldxset', title: 'Lockdown settings', get tile() { return TEACHER() ? { icon: '🔒', meta: 'Lockdown exam mode: settings, class exam codes and unlocking a student.' } : null; },
      render: api => (TEACHER() ? setHTML(api) : `<div class="card"><h2>Lockdown settings</h2><p>Lockdown settings are in the Teacher Edition.</p></div>`),
      mount(api, loc, el) {
        const root = el.querySelector('.stage-in') || el;
        root.addEventListener('change', e => { if (!e.target.closest('[data-ldxs]') || !KEY()) return; const c = readForm(root); const cc = root.querySelector('#ldx-ccode'), ac = root.querySelector('#ldx-acode'); if (cc) cc.textContent = cfgCodeFor(Object.assign({}, c, { adjust: false })); if (ac) ac.textContent = cfgCodeFor(Object.assign({}, c, { adjust: true })); });
        const aid = root.querySelector('#ldx-aid'); if (aid) aid.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); const b = root.querySelector('[data-px="ldx-ucode"]'); if (b) b.click(); } });
      },
      click(a, el, api) {
        const root = document.querySelector('#stage');
        if (a === 'ldx-save') { const c = readForm(root); const code = cfgCodeFor(c); if (!code) { api.toast('The teacher key did not load.'); return; } lsSet(LSK.teacher, code); api.render(); api.toast('Lockdown settings saved on this device'); }
        else if (a === 'ldx-reset') { lsSet(LSK.teacher, null); api.render(); api.toast('Back to the defaults'); }
        else if (a === 'ldx-ucode') { const v = norm((root.querySelector('#ldx-aid') || {}).value); const out = root.querySelector('#ldx-uout'); if (v.length !== 8) { out.textContent = 'Type the 8-character attempt id.'; return; } out.textContent = 'Unlock code: ' + unlockCodeFor(v); }
      }
    });
    P.push({
      view: 'ldxlog', title: 'Exam integrity log', get tile() { return OWNER ? { icon: '🛡️', meta: 'Owner only: every lockdown attempt, its times and flags, with Unlock.' } : null; },
      render: () => (OWNER ? logHTML() : `<div class="card"><h2>Exam integrity log</h2><p>This view is for the course owner.</p></div>`),
      mount(api) { if (!OWNER || LOGDATA) return; loadLog().then(d => { LOGDATA = d || { rows: [], names: {} }; if (api.S.loc.v === 'ldxlog') api.render(); }).catch(() => { LOGDATA = { rows: [], names: {} }; }); }
    });
  }

  window.COURSE_LOCKDOWN = { version: 1, stage, begin: (ctx) => begin(ctx, coursePort), finish, settings, typeOn, getLock, locks: lockSummary, history, reportHTML, reportText, connectLocal, isActive: active, checkCfgCode, cfgCodeFor, unlockCodeFor, checkUnlock, slotOf, _sha256: sha256, _verifier: verifier, get session() { return sess ? pub(sess) : null; }, get online() { return onlineP; }, get owner() { return OWNER; }, refreshLog() { LOGDATA = null; }, CSS };
})();
