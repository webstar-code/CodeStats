import React, { useState, useEffect, useContext } from 'react';
import { Container, Head, GraphContainer, GraphContainerHeader, Selector, Option, Selection, Icon, Display } from '../dataStyles';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CodeTime from '../../components/CodeTime';
import VerticalBarGraph from '../../components/VerticalBarGraph'
import { formatDate, format_date_toMonth, get_total_time } from '../../utils/functions';
import { ReactContext } from '../../context/context';
import { Redirect } from 'react-router';

const Weekly = () => {
  const state = useContext(ReactContext);

  let total_time = '';
  let firstday_ofweek;
  let lastday_ofweek;

  let defaultYear = new Date().getFullYear();
  let defaultWeekno = get_current_weekno();

  const [weekno, setWeekno] = useState(defaultWeekno);
  const [year, setyear] = useState(defaultYear);
  const [user, setUser] = useState();
  const [days, setDays] = useState([]);


  useEffect(() => {
    if (state.days && state.days.days)
      setDays(state.days.days);
    setUser(state.user);
  }, [state]);

  function get_current_weekno(today = new Date()) {
    today.setDate(today.getDate() + 3 - (today.getDay() + 6) % 7);
    let week1 = new Date(today.getFullYear(), 0, 4);
    return 1 + Math.round(((today.getTime() - week1.getTime())
      / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  function calculate_date_from_weekno() {
    const firstDay = new Date(year, 0, 1);
    let days = 2 + 0 + (weekno - 1) * 7 - firstDay.getDay();
    return new Date(year, 0, days);
  }

  function GetWeekDays() {
    let week_start_date = calculate_date_from_weekno();
    let weekdays = [];
    weekdays.push(formatDate(week_start_date));
    for (let i = 1; i < 7; i++) {
      let tommorow = new Date(week_start_date.getTime() + (24 * 60 * 60 * 1000 * i));
      weekdays.push(formatDate(tommorow));
    }
    firstday_ofweek = format_date_toMonth(weekdays[0]);
    lastday_ofweek = format_date_toMonth(weekdays[6]);

    let arr = days.filter((day) => weekdays.includes(day.date));
    return arr;
  }
  let created_at;
  let currweek;
  if (days && user) {
    created_at = new Date(user.created_at).getFullYear();
    currweek = GetWeekDays();
    total_time = get_total_time(currweek);
  }

  const weekOptions = () => {
    let weekoptions = [];
    for (let i = 1; i <= 52; i++) {
      weekoptions.push(i);
    }
    return weekoptions;
  }
  const YearOptions = () => {
    let year_options = [];
    let curryear = new Date().getFullYear();
    for (let i = created_at; i <= curryear; i++) {
      year_options.push(<Option value={i} key={i}>{i}</Option>)
    }
    return year_options;
  }

  return (
    <Container>
      {!localStorage.getItem('userid') && <Redirect to="/import"/> }

      <Head>
        <CodeTime type="Weekly" time={total_time} />
      </Head>
      <GraphContainer>
        {currweek ?
          <>
            <GraphContainerHeader>
              <Selection>
                <Selector name="week" value={weekno} onChange={(e) => setWeekno(Number(e.target.value))}>
                  {weekOptions().map((item, index) => (
                    <Option value={item} key={index}>Week {item}</Option>
                  ))}
                </Selector>
                <Selector name="year" value={year} onChange={(e) => setyear(Number(e.target.value))}>
                  {YearOptions().map(item => (item))}
                </Selector>
              </Selection>
              <Display>
                <Icon onClick={() => setWeekno((weekno) => weekno <= 1 ? (52) : (weekno - 1))}>
                  <MdChevronLeft />
                </Icon>
                <p>{firstday_ofweek} - {lastday_ofweek}</p>
                <Icon onClick={() => setWeekno((weekno) => weekno >= 52 ? 1 : weekno + 1)} >
                  <MdChevronRight />
                </Icon>
              </Display>
            </GraphContainerHeader>
            <VerticalBarGraph userData={currweek} />
          </>
          : <h1>No data</h1>}
      </GraphContainer>
    </Container>
  )
}

export default Weekly;