module.exports = [
  {
    sheep_id: 1,
    tag_id: "1234abc",
    sex: "f",
    dob: "2020-10-02",
    purchase_date: "2020-01-01",
    breed_id: 1,
    scrapie_id: "4322342",
    name: "Betsy",
    weight_at_birth: 4,
    date_last_bred: "2022-02-10",
    color_id: 1,
    marking_id: 1,
  },

INSERT INTO sheep (rowid, sheep_id, picture, tag_id, scrapie_id, name, dob, sex, sire, dam, purchase_date, weight_at_birth, date_deceased, breed_id, color_id, marking_id, date_last_bred) 
            VALUES (null, '1', '', '1234abc', '4322342', 'Betsy', 2020-10-02, 'f', '', '', 2020-01-01, 4, null, '1', '2', '3', null);
  {
    sheep_id: 2,
    tag_id: "567def",
    sex: "m",
    dob: "2022-06-01",
    breed_id: 2,
    sire: 5,
    dam: 1,
    scrapie_id: "564224",
    name: "Hugo",
    weight_at_birth: 5,
    color_id: 2,
    marking_id: 11,
  },
  {
    sheep_id: 3,
    tag_id: "123opq",
    sex: "f",
    dob: "2022-03-04",
    breed_id: 2,
    sire: 2,
    dam: 1,
    scrapie_id: "346537623",
    name: "Mary",
    weight_at_birth: 5.5,
    color_id: 4,
    marking_id: 5,
  },
  {
    sheep_id: 4,
    tag_id: "55555",
    sex: "f",
    dob: "2021-10-05",
    breed_id: 3,
    sire: 5,
    dam: 3,
    scrapie_id: "23526",
    name: "Bree",
    weight_at_birth: 5,
    color_id: 3,
    marking_id: 7,
  },
  {
    sheep_id: 5,
    tag_id: "222",
    sex: "m",
    dob: "2021-10-10",
    breed_id: 1,
    sire: 5,
    dam: 3,
    scrapie_id: "3569742",
    name: "Black",
    weight_at_birth: 4,
    color_id: 5,
    date_deceased: "2022-02-10",
    marking_id: 10,
  },
  {
    sheep_id: 6,
    tag_id: "abcd342",
    sex: "m",
    dob: "2021-10-10",
    breed_id: 1,
    sire: 5,
    dam: 3,
    scrapie_id: "5642124",
    name: "White",
    weight_at_birth: 5,
    color_id: 6,
    date_deceased: "2022-01-10",
    marking_id: 9,
  },
];
