import P1 from './assets/p1.jpg'
import P2 from './assets/p2.jpg'
import P3 from './assets/p3.jpg'
import axios from 'axios'
import React from 'react'

export const items = [
    { 
      id: 1,
      tab: {
        title: "Гостинная",
        image: P1,
      }, 
      content: {
        tabs: [
          {
            title: "Малярные работы",
            times: 1
          },
          {
            title: "Стены",
            null: null
          },
          {
            title: "Пол",
            times: 3
          },
          {
            title: "Потолок",
            times: null
          },
          {
            title: "Окна",
            times: null
          },
          {
            title: "Двери",
            times: null
          },
          {
            title: "Балкон",
            times: null
          }
        ],
        services: [
          [
            {
              title: "Укладка плитки пол/стены",
              coast: 199
            },
            {
              title: "Вентиляция ",
              coast: "Договорная"
            },
            {
              title: "Монтаж душевой кабины",
              coast: 158
            }
          ],
          [
            {
              title: "Укладка плитки пол/стены",
              coast: 199
            },
            {
              title: "Вентиляция ",
              coast: "Договорная"
            },
            {
              title: "Монтаж душевой кабины",
              coast: 158
            }
          ],
          [
            {
              title: "Укладка плитки пол/стены",
              coast: 199
            },
            {
              title: "Вентиляция ",
              coast: "Договорная"
            },
            {
              title: "Монтаж душевой кабины",
              coast: 158
            }
          ],
          [
            {
              title: "Укладка плитки пол/стены",
              coast: 199
            },
            {
              title: "Вентиляция ",
              coast: "Договорная"
            },
            {
              title: "Монтаж душевой кабины",
              coast: 158
            }
          ],
          [
            {
              title: "Укладка плитки пол/стены",
              coast: 199
            },
            {
              title: "Вентиляция ",
              coast: "Договорная"
            },
          ],
          [
            {
              title: "Вентиляция ",
              coast: "Договорная"
            },
            {
              title: "Монтаж душевой кабины",
              coast: 158
            }
          ],
          [
            {
              title: "Укладка плитки пол/стены",
              coast: 199
            },
            {
              title: "Монтаж душевой кабины",
              coast: 158
            }
          ],
        ]
      } 
    },
    { 
      id: 2,
      tab: {
        title: "Ванная",
        image: P2,
      }, 
      content: {
        tabs: [
          {
            title: "Ванная",
            times: 1
          },
        ],
        services: [
          [
            {
              title: "Укладка плитки пол/стены",
              coast: 199
            },
            {
              title: "Вентиляция ",
              coast: "Договорная"
            },
            {
              title: "Монтаж душевой кабины",
              coast: 158
            }
          ],
        ]
      } 
    },
    { 
      id: 3,
      tab: {
        title: "Спальня",
        image: P3,
      }, 
      content: {
        tabs: [
          {
            title: "Кровать",
            times: null
          }
        ],
        services: [
          [
            {
              title: "какая-то залупа",
              coast: 300
            }
          ],
          
        ]
      } 
    },
    
  ];
