import React, { useState, useEffect, useContext } from 'react';
import { Container, Head, GraphContainer, GraphContainerHeader, Selector, Option, Selection, Icon, Display } from '../dataStyles';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CodeTime from '../../components/CodeTime';
import VerticalBarGraph from '../../components/VerticalBarGraph'
import { formatDate, get_total_time } from '../../utils/functions';
import { ReactContext } from '../../context/context';
import { Redirect } from 'react-router';

const Yearly = () => {
  const state = useContext(ReactContext);
  const [yearno, setYearno] = useState(2020);
  const [user, setUser] = useState();
  const [days, setDays] = useState();


  useEffect(() => {
    if (state.days && state.days.days)
      setDays(state.days.days);
    setUser(state.user);
  }, [state]);

  function get_allDays_inYear(year) {
    var date = new Date(year, 0, 1);
    var days = [];
    while (date.getFullYear() === year) {
      days.push(formatDate(new Date(date)));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  let created_at;
  let curryear_days;
  let total_time;

  if (user) {
    created_at = new Date(user.created_at).getFullYear();
    console.log(created_at);
  }
  if (days && user) {
    curryear_days = get_allDays_inYear(yearno);
    curryear_days = curryear_days.map(item => {
      let el = days.find((day) => (day.date === item))
      if (el) return el;
      return { date: item, grand_total: {} };
    })
    total_time = get_total_time(curryear_days);
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
        <CodeTime type="Yearly" time={total_time} />
      </Head>
      <GraphContainer>
        {curryear_days &&
          <>
            <GraphContainerHeader>
              <Selection>
                <Selector name="year" value={yearno} onChange={(e) => setYearno(Number(e.target.value))}>
                  {YearOptions().map(item => (item))}
                </Selector>
              </Selection>
              <Display>
                <Icon onClick={() => setYearno((yearno) => yearno - 1)}>
                  <MdChevronLeft />
                </Icon>
                <p>{yearno}</p>
                <Icon onClick={() => setYearno((yearno) => yearno + 1)}>
                  <MdChevronRight />
                </Icon>
              </Display>
            </GraphContainerHeader>
            <VerticalBarGraph userData={curryear_days} />
          </>
        }
      </GraphContainer>
    </Container>
  )
}

export default Yearly;